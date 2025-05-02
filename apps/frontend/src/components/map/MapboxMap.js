import { useState, useRef, useEffect } from 'react';
import Map, { 
  NavigationControl, 
  GeolocateControl, 
  Marker,
  Popup
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxConfig from '@/config/mapbox';

export default function MapboxMap({
  initialViewState,
  markers = [],
  onMapClick,
  onMarkerClick,
  mapStyle = mapboxConfig.defaultStyle,
  className = "w-full h-[450px] rounded-lg overflow-hidden",
}) {
  const mapRef = useRef(null);
  const [viewState, setViewState] = useState({
    longitude: initialViewState?.longitude || mapboxConfig.defaultCenter[0],
    latitude: initialViewState?.latitude || mapboxConfig.defaultCenter[1],
    zoom: initialViewState?.zoom || mapboxConfig.defaultZoom,
  });
  const [popupInfo, setPopupInfo] = useState(null);

  // Update view state when props change
  useEffect(() => {
    if (initialViewState) {
      setViewState({
        longitude: initialViewState.longitude,
        latitude: initialViewState.latitude,
        zoom: initialViewState.zoom || viewState.zoom,
      });
    }
  }, [initialViewState]);

  // Handle map click
  const handleMapClick = (event) => {
    if (onMapClick) {
      onMapClick({
        longitude: event.lngLat.lng,
        latitude: event.lngLat.lat,
      });
    }
  };

  return (
    <div className={className}>
      <Map
        ref={mapRef}
        mapboxAccessToken={mapboxConfig.publicToken}
        mapStyle={mapStyle}
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        onClick={handleMapClick}
      >
        {/* Navigation controls */}
        <NavigationControl position="top-right" />
        <GeolocateControl 
          position="top-right" 
          trackUserLocation 
          showUserHeading 
        />

        {/* Render markers */}
        {markers.map((marker, index) => (
          <Marker
            key={`marker-${index}`}
            longitude={marker.longitude}
            latitude={marker.latitude}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setPopupInfo(marker);
              if (onMarkerClick) onMarkerClick(marker);
            }}
          >
            {marker.element || (
              <div className="text-primary cursor-pointer">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  width="24" 
                  height="24" 
                  fill="currentColor"
                >
                  <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
                </svg>
              </div>
            )}
          </Marker>
        ))}

        {/* Popup for selected marker */}
        {popupInfo && (
          <Popup
            anchor="top"
            longitude={popupInfo.longitude}
            latitude={popupInfo.latitude}
            onClose={() => setPopupInfo(null)}
            closeOnClick={false}
          >
            <div className="p-2">
              {popupInfo.popupContent || (
                <div>
                  <h3 className="font-bold">{popupInfo.title || 'Location'}</h3>
                  <p>{popupInfo.description || `${popupInfo.latitude.toFixed(4)}, ${popupInfo.longitude.toFixed(4)}`}</p>
                </div>
              )}
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
} 