import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Building2, ExternalLink, MapPin, Navigation, PawPrint, Store } from "lucide-react";
import { getCoordinatesForEntity } from "../../data/geoData";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const markerConfig = {
  pet: { label: "Pet", icon: PawPrint, pin: "#2563eb" },
  ong: { label: "ONG", icon: Building2, pin: "#10b981" },
  petshop: { label: "Pet shop", icon: Store, pin: "#f59e0b" },
  origin: { label: "Origem", icon: Navigation, pin: "#f8fafc" },
};

let googleMapsLoader = null;

function loadGoogleMaps() {
  if (!GOOGLE_MAPS_API_KEY || typeof window === "undefined") return Promise.resolve(null);
  if (window.google?.maps) return Promise.resolve(window.google.maps);
  if (googleMapsLoader) return googleMapsLoader;

  googleMapsLoader = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.google?.maps || null);
    script.onerror = () => reject(new Error("Não foi possível carregar o Google Maps."));
    document.head.appendChild(script);
  });

  return googleMapsLoader;
}

function getGoogleMapsUrl(marker) {
  return `https://www.google.com/maps/search/?api=1&query=${marker.coordinates.lat},${marker.coordinates.lng}`;
}

export default function GoogleMap({
  title = "Mapa",
  description = "Pontos aproximados exibidos no Google Maps.",
  markers = [],
  origin = null,
  className = "",
  showLegend = true,
}) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const googleMarkersRef = useRef([]);
  const [selectedId, setSelectedId] = useState("");
  const [mapError, setMapError] = useState("");

  const preparedMarkers = useMemo(() => {
    const normalized = markers
      .map((marker) => {
        const coordinates = marker.coordinates || getCoordinatesForEntity(marker);
        return coordinates ? { ...marker, coordinates } : null;
      })
      .filter(Boolean);

    if (origin) {
      normalized.push({
        id: "origin",
        type: "origin",
        name: origin.label || "Sua localizacao",
        city: origin.city,
        neighborhood: origin.neighborhood,
        coordinates: origin,
      });
    }

    return normalized;
  }, [markers, origin]);

  const selectedMarker = preparedMarkers.find((marker) => marker.id === selectedId) || preparedMarkers[0];
  const center = selectedMarker?.coordinates || preparedMarkers[0]?.coordinates || { lat: -12.9777, lng: -38.5016 };
  const embedSrc = `https://www.google.com/maps?q=${encodeURIComponent(`${center.lat},${center.lng}`)}&z=12&output=embed`;

  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY || !mapRef.current || preparedMarkers.length === 0) return undefined;

    let isMounted = true;
    const infoWindowRef = { current: null };

    loadGoogleMaps()
      .then((maps) => {
        if (!isMounted || !maps || !mapRef.current) return;

        const map = new maps.Map(mapRef.current, {
          center,
          zoom: 10,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
        });
        mapInstanceRef.current = map;
        infoWindowRef.current = new maps.InfoWindow();

        googleMarkersRef.current.forEach((marker) => marker.setMap(null));
        googleMarkersRef.current = preparedMarkers.map((marker) => {
          const config = markerConfig[marker.type] || markerConfig.pet;
          const googleMarker = new maps.Marker({
            position: marker.coordinates,
            map,
            title: marker.name,
            label: marker.type === "origin" ? "" : config.label[0],
          });

          googleMarker.addListener("click", () => {
            setSelectedId(marker.id);
            infoWindowRef.current.setContent(
              `<strong>${marker.name}</strong><br>${[marker.neighborhood, marker.city].filter(Boolean).join(", ")}`,
            );
            infoWindowRef.current.open({ anchor: googleMarker, map });
          });

          return googleMarker;
        });
      })
      .catch((error) => {
        if (isMounted) setMapError(error.message);
      });

    return () => {
      isMounted = false;
      googleMarkersRef.current.forEach((marker) => marker.setMap(null));
      googleMarkersRef.current = [];
    };
  }, [center, preparedMarkers]);

  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY || !mapInstanceRef.current || !selectedMarker) return;
    mapInstanceRef.current.panTo(selectedMarker.coordinates);
  }, [selectedMarker]);

  return (
    <section className={`overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 ${className}`}>
      <div className="flex flex-col gap-2 border-b border-slate-800 p-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <p className="mt-1 text-sm text-slate-400">{description}</p>
          {mapError && <p className="mt-2 text-xs text-amber-200">{mapError} Usando visualizacao incorporada.</p>}
        </div>
        {showLegend && (
          <div className="flex flex-wrap gap-2 text-xs text-slate-300">
            {Object.entries(markerConfig)
              .filter(([type]) => type !== "origin")
              .map(([type, config]) => (
                <span key={type} className="inline-flex items-center gap-1 rounded-full bg-slate-800 px-2.5 py-1">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: config.pin }} />
                  {config.label}
                </span>
              ))}
          </div>
        )}
      </div>

      <div className="grid min-h-[380px] lg:grid-cols-[1fr_320px]">
        <div className="min-h-[380px] bg-slate-950">
          {GOOGLE_MAPS_API_KEY && !mapError ? (
            <div ref={mapRef} className="h-full min-h-[380px] w-full" aria-label={title} />
          ) : (
            <iframe
              title={title}
              src={embedSrc}
              className="h-full min-h-[380px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          )}
        </div>

        <aside className="border-t border-slate-800 bg-slate-800/80 p-4 lg:border-l lg:border-t-0">
          {selectedMarker ? (
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                {markerConfig[selectedMarker.type]?.label || "Local"}
              </p>
              <h3 className="mt-2 text-xl font-bold text-white">{selectedMarker.name}</h3>
              <p className="mt-2 flex items-center gap-2 text-sm text-slate-300">
                <MapPin className="h-4 w-4 text-slate-500" />
                {[selectedMarker.neighborhood, selectedMarker.city].filter(Boolean).join(", ")}
              </p>
              {typeof selectedMarker.distanceKm === "number" && (
                <p className="mt-3 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200">
                  {selectedMarker.distanceKm.toFixed(1)} km da origem selecionada
                </p>
              )}
              <div className="mt-4 flex flex-col gap-2">
                {selectedMarker.href && selectedMarker.type !== "origin" && (
                  <Link
                    to={selectedMarker.href}
                    className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Abrir detalhes
                  </Link>
                )}
                <a
                  href={getGoogleMapsUrl(selectedMarker)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-600 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-700"
                >
                  Abrir no Google Maps
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              {preparedMarkers.length > 1 && (
                <div className="mt-5 space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Pontos no mapa</p>
                  <div className="max-h-48 space-y-2 overflow-auto pr-1">
                    {preparedMarkers.map((marker) => {
                      const Icon = markerConfig[marker.type]?.icon || PawPrint;
                      const isSelected = marker.id === selectedMarker.id;
                      return (
                        <button
                          key={marker.id}
                          type="button"
                          onClick={() => setSelectedId(marker.id)}
                          className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition ${
                            isSelected ?"bg-blue-600 text-white" : "bg-slate-900 text-slate-300 hover:bg-slate-700"
                          }`}
                        >
                          <Icon className="h-4 w-4 shrink-0" />
                          <span className="min-w-0 truncate">{marker.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-slate-400">Nenhum ponto para exibir no mapa.</p>
          )}
        </aside>
      </div>
    </section>
  );
}
