const WAIT_TIMEOUT_MS = 15_000;
const POLL_INTERVAL_MS = 50;

function waitForMapsApi(): Promise<void> {
  return new Promise((resolve, reject) => {
    const kakao = window.kakao;
    if (!kakao?.maps) {
      reject(new Error("Kakao Maps API is unavailable"));
      return;
    }

    kakao.maps.load(() => resolve());
  });
}

function isSdkReady(): boolean {
  return Boolean(window.kakao?.maps);
}

function waitForScriptElement(script: HTMLScriptElement): Promise<void> {
  return new Promise((resolve, reject) => {
    if (isSdkReady()) {
      waitForMapsApi().then(resolve).catch(reject);
      return;
    }

    const onLoad = () => {
      script.removeEventListener("load", onLoad);
      script.removeEventListener("error", onError);
      if (isSdkReady()) {
        waitForMapsApi().then(resolve).catch(reject);
        return;
      }
      reject(new Error("Kakao Maps SDK auth failed"));
    };

    const onError = () => {
      script.removeEventListener("load", onLoad);
      script.removeEventListener("error", onError);
      reject(new Error("Kakao Maps SDK network error"));
    };

    script.addEventListener("load", onLoad, { once: true });
    script.addEventListener("error", onError, { once: true });
  });
}

/** index.html에 주입된 SDK 또는 동적 로드 완료까지 대기 */
export function loadKakaoMapSdk(appKey: string): Promise<void> {
  if (isSdkReady()) {
    return waitForMapsApi();
  }

  const existing = document.querySelector<HTMLScriptElement>('script[data-kakao-map-sdk="true"]');

  if (existing) {
    return new Promise((resolve, reject) => {
      const startedAt = Date.now();

      const poll = () => {
        if (isSdkReady()) {
          waitForMapsApi().then(resolve).catch(reject);
          return;
        }

        if (Date.now() - startedAt >= WAIT_TIMEOUT_MS) {
          reject(new Error("Kakao Maps SDK auth failed"));
          return;
        }

        window.setTimeout(poll, POLL_INTERVAL_MS);
      };

      if (existing.dataset.loaded === "true") {
        poll();
        return;
      }

      waitForScriptElement(existing).then(resolve).catch(() => poll());
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${encodeURIComponent(appKey)}&autoload=false&libraries=services`;
    script.async = true;
    script.defer = true;
    script.dataset.kakaoMapSdk = "true";

    script.addEventListener(
      "load",
      () => {
        script.dataset.loaded = "true";
        waitForMapsApi().then(resolve).catch(reject);
      },
      { once: true },
    );

    script.addEventListener(
      "error",
      () => {
        reject(new Error("Kakao Maps SDK network error"));
      },
      { once: true },
    );

    document.head.appendChild(script);
  });
}

export function kakaoMapLoadErrorMessage(error: unknown): string {
  const reason = error instanceof Error ? error.message : "";

  if (reason.includes("auth failed") || reason.includes("network error")) {
    return [
      "카카오 지도 SDK를 불러오지 못했습니다.",
      "카카오 개발자 콘솔에서 [카카오맵] API를 켜고, JavaScript 키의 Web 도메인에",
      "http://localhost:5173 · http://localhost:5174 · http://127.0.0.1:5173 (및 실제 배포 도메인)을 등록해 주세요.",
    ].join(" ");
  }

  if (reason.includes("missing")) {
    return "지도 API 키(.env.local)를 확인한 뒤 개발 서버를 재시작해 주세요.";
  }

  return "지도를 표시하지 못했습니다. 잠시 후 다시 시도해 주세요.";
}
