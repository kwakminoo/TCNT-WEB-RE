import { useEffect, useRef, useState } from "react";
import {
  LOCATION_GEO_QUERY,
  LOCATION_KAKAO_MAP_EMBED_SRC,
  LOCATION_MAP_FALLBACK,
  LOCATION_MAP_LABEL,
} from "../../content/company/locationData";
import { kakaoMapLoadErrorMessage, loadKakaoMapSdk } from "../../lib/kakaoMapLoader";

type MapMode = "loading" | "sdk" | "embed";

const MAP_OPTIONS = {
  level: 3,
  mapTypeControl: false,
  zoomControl: false,
  scaleControl: false,
  draggable: true,
  scrollwheel: true,
  disableDoubleClick: false,
  disableDoubleClickZoom: false,
} as const;

function waitForContainerSize(container: HTMLElement, maxAttempts = 40): Promise<void> {
  return new Promise((resolve) => {
    let attempts = 0;

    const check = () => {
      if (container.offsetWidth > 0 && container.offsetHeight > 0) {
        resolve();
        return;
      }

      attempts += 1;
      if (attempts >= maxAttempts) {
        resolve();
        return;
      }

      requestAnimationFrame(check);
    };

    check();
  });
}

export function KakaoMapEmbed() {
  const appKey = import.meta.env.VITE_KAKAO_MAP_APP_KEY?.trim();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<MapMode>(appKey ? "loading" : "embed");
  const [embedHint, setEmbedHint] = useState<string | null>(null);

  useEffect(() => {
    if (!appKey) return;

    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    let resizeObserver: ResizeObserver | undefined;
    let mapInstance: KakaoMapsMap | undefined;
    let markerInstance: KakaoMapsMarker | undefined;

    const showEmbedFallback = (error?: unknown) => {
      if (cancelled) return;
      setEmbedHint(error ? kakaoMapLoadErrorMessage(error) : null);
      setMode("embed");
    };

    const placeMarker = (lat: number, lng: number) => {
      const kakao = window.kakao;
      if (!kakao?.maps || !mapInstance || cancelled) return;

      const center = new kakao.maps.LatLng(lat, lng);
      mapInstance.setCenter(center);
      markerInstance?.setMap(null);
      markerInstance = new kakao.maps.Marker({ map: mapInstance, position: center });
    };

    const initMap = async (lat: number, lng: number) => {
      const kakao = window.kakao;
      if (!kakao?.maps) {
        throw new Error("Kakao Maps API is unavailable");
      }

      await waitForContainerSize(container);
      if (cancelled) return;

      const center = new kakao.maps.LatLng(lat, lng);
      mapInstance = new kakao.maps.Map(container, {
        center,
        ...MAP_OPTIONS,
      });

      markerInstance = new kakao.maps.Marker({ map: mapInstance, position: center });

      const relayout = () => {
        mapInstance?.relayout();
        mapInstance?.setCenter(center);
      };

      requestAnimationFrame(() => {
        relayout();
        window.setTimeout(relayout, 120);
      });

      resizeObserver = new ResizeObserver(relayout);
      resizeObserver.observe(container);

      setMode("sdk");
    };

    const refineWithGeocoder = () => {
      const kakao = window.kakao;
      if (!kakao?.maps || cancelled) return;

      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(LOCATION_GEO_QUERY, (result, geocodeStatus) => {
        if (cancelled || geocodeStatus !== kakao.maps.services.Status.OK || !result[0]) {
          return;
        }

        placeMarker(parseFloat(result[0].y), parseFloat(result[0].x));
      });
    };

    loadKakaoMapSdk(appKey)
      .then(async () => {
        if (cancelled) return;
        await initMap(LOCATION_MAP_FALLBACK.lat, LOCATION_MAP_FALLBACK.lng);
        refineWithGeocoder();
      })
      .catch((error: unknown) => {
        showEmbedFallback(error);
      });

    return () => {
      cancelled = true;
      resizeObserver?.disconnect();
      markerInstance?.setMap(null);
      mapInstance = undefined;
      markerInstance = undefined;
    };
  }, [appKey]);

  const showEmbed = mode === "embed";
  const showLoading = mode === "loading";

  return (
    <div className="location-map" role="region" aria-label="회사 위치 지도">
      <div
        ref={containerRef}
        className="location-map__canvas"
        hidden={showEmbed}
        aria-hidden={showEmbed}
      />

      {showEmbed ? (
        <iframe
          className="location-map__embed"
          title={`${LOCATION_MAP_LABEL} 위치 — 카카오맵`}
          src={LOCATION_KAKAO_MAP_EMBED_SRC}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : null}

      {showLoading ? (
        <p className="location-map__status" aria-live="polite">
          지도를 불러오는 중입니다…
        </p>
      ) : null}

      {showEmbed && embedHint ? (
        <p className="location-map__hint" role="status">
          {embedHint}
        </p>
      ) : null}
    </div>
  );
}
