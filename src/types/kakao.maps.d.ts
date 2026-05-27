/** 카카오맵 JavaScript API (최소 타입) */
interface KakaoMapsLatLng {
  getLat(): number;
  getLng(): number;
}

interface KakaoMapsMapOptions {
  center: KakaoMapsLatLng;
  level?: number;
  mapTypeControl?: boolean;
  zoomControl?: boolean;
  scaleControl?: boolean;
  draggable?: boolean;
  scrollwheel?: boolean;
  disableDoubleClick?: boolean;
  disableDoubleClickZoom?: boolean;
}

interface KakaoMapsMap {
  setCenter(latlng: KakaoMapsLatLng): void;
  relayout(): void;
}

interface KakaoMapsMarkerOptions {
  map?: KakaoMapsMap;
  position: KakaoMapsLatLng;
}

interface KakaoMapsMarker {
  setMap(map: KakaoMapsMap | null): void;
}

interface KakaoMapsInfoWindowOptions {
  content: string | HTMLElement;
}

interface KakaoMapsInfoWindow {
  open(map: KakaoMapsMap, marker: KakaoMapsMarker): void;
  close(): void;
}

interface KakaoGeocoderResult {
  x: string;
  y: string;
}

interface KakaoMapsServices {
  Geocoder: new () => {
    addressSearch(
      address: string,
      callback: (result: KakaoGeocoderResult[], status: string) => void,
    ): void;
  };
  Status: {
    OK: string;
    ZERO_RESULT: string;
    ERROR: string;
  };
}

interface KakaoMapsNamespace {
  load(callback: () => void): void;
  LatLng: new (lat: number, lng: number) => KakaoMapsLatLng;
  Map: new (container: HTMLElement, options: KakaoMapsMapOptions) => KakaoMapsMap;
  Marker: new (options: KakaoMapsMarkerOptions) => KakaoMapsMarker;
  InfoWindow: new (options: KakaoMapsInfoWindowOptions) => KakaoMapsInfoWindow;
  services: KakaoMapsServices;
}

interface KakaoNamespace {
  maps: KakaoMapsNamespace;
}

interface Window {
  kakao?: KakaoNamespace;
}
