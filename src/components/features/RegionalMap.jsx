import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Building2, MapPin, Navigation, PawPrint, Store } from "lucide-react";
import { getCoordinatesForEntity } from "../../data/geoData";

const bounds = {
  minLat: -13.08,
  maxLat: -12.18,
  minLng: -39.05,
  maxLng: -38.24,
};

const markerStyles = {
  pet: {
    label: "Pet",
    icon: PawPrint,
    className: "bg-blue-500 text-white ring-blue-200/40",
  },
  ong: {
    label: "ONG",
    icon: Building2,
    className: "bg-emerald-500 text-white ring-emerald-200/40",
  },
  petshop: {
    label: "Pet shop",
    icon: Store,
    className: "bg-amber-400 text-slate-950 ring-amber-100/50",
  },
  origin: {
    label: "Você",
    icon: Navigation,
    className: "bg-white text-slate-950 ring-white/60",
  },
};

function toPosition(coordinates) {
  const left = ((coordinates.lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 100;
  const top = ((bounds.maxLat - coordinates.lat) / (bounds.maxLat - bounds.minLat)) * 100;
  return {
    left: `${Math.min(96, Math.max(4, left))}%`,
    top: `${Math.min(92, Math.max(8, top))}%`,
  };
}

export default function RegionalMap({
  title = "Mapa regional",
  description = "Visualizacao aproximada por cidade e bairro.",
  markers = [],
  origin = null,
  className = "",
}) {
  const [selectedId, setSelectedId] = useState("");

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

  return (
    <section className={`overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 ${className}`}>
      <div className="flex flex-col gap-2 border-b border-slate-800 p-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <p className="mt-1 text-sm text-slate-400">{description}</p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-slate-300">
          {Object.entries(markerStyles)
            .filter(([type]) => type !== "origin")
            .map(([type, config]) => (
              <span key={type} className="inline-flex items-center gap-1 rounded-full bg-slate-800 px-2.5 py-1">
                <span className={`h-2 w-2 rounded-full ${config.className.split(" ")[0]}`} />
                {config.label}
              </span>
            ))}
        </div>
      </div>

      <div className="grid min-h-[360px] lg:grid-cols-[1fr_300px]">
        <div className="relative min-h-[360px] overflow-hidden bg-slate-950">
          <div className="absolute inset-0 opacity-70">
            <div className="absolute left-[12%] top-0 h-full w-px bg-slate-800" />
            <div className="absolute left-[38%] top-0 h-full w-px bg-slate-800" />
            <div className="absolute left-[68%] top-0 h-full w-px bg-slate-800" />
            <div className="absolute left-0 top-[18%] h-px w-full bg-slate-800" />
            <div className="absolute left-0 top-[46%] h-px w-full bg-slate-800" />
            <div className="absolute left-0 top-[72%] h-px w-full bg-slate-800" />
            <div className="absolute left-[10%] top-[82%] h-1 w-[80%] -rotate-12 rounded-full bg-blue-500/10" />
            <div className="absolute left-[18%] top-[22%] h-1 w-[65%] rotate-[22deg] rounded-full bg-emerald-500/10" />
          </div>

          <MapLabel city="Salvador" style={{ left: "12%", top: "70%" }} />
          <MapLabel city="Lauro de Freitas" style={{ left: "43%", top: "61%" }} />
          <MapLabel city="Feira de Santana" style={{ left: "13%", top: "17%" }} />

          {preparedMarkers.map((marker) => {
            const config = markerStyles[marker.type] || markerStyles.pet;
            const Icon = config.icon;
            const position = toPosition(marker.coordinates);
            const isSelected = marker.id === selectedMarker?.id;

            return (
              <button
                key={marker.id}
                type="button"
                onClick={() => setSelectedId(marker.id)}
                className={`absolute z-10 inline-flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-lg ring-4 transition hover:scale-110 ${config.className} ${
                  isSelected ? "scale-110 ring-white/70" : ""
                }`}
                style={position}
                aria-label={`Selecionar ${marker.name}`}
              >
                <Icon className="h-4 w-4" />
              </button>
            );
          })}
        </div>

        <aside className="border-t border-slate-800 bg-slate-800/80 p-4 lg:border-l lg:border-t-0">
          {selectedMarker ? (
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                {markerStyles[selectedMarker.type]?.label || "Local"}
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
              {selectedMarker.description && (
                <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-slate-300">
                  {selectedMarker.description}
                </p>
              )}
              {selectedMarker.href && selectedMarker.type !== "origin" && (
                <Link
                  to={selectedMarker.href}
                  className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Abrir detalhes
                </Link>
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

function MapLabel({ city, style }) {
  return (
    <span
      className="absolute rounded-full border border-slate-700 bg-slate-900/90 px-3 py-1 text-xs font-semibold text-slate-300"
      style={style}
    >
      {city}
    </span>
  );
}
