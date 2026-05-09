import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Clock,
  ListFilter,
  MapPin,
  Shirt,
  Sparkles,
  Spool,
  X,
} from "lucide-react";
import { events, inventory, MapLayer, Mender, menders, MendEvent } from "./data";

const token = import.meta.env.MAP || import.meta.env.VITE_MAPBOX_TOKEN;
const mapboxStylePath = "annamakesmapbox/cmoyf4wr2002001s7aavbhqdk";

const londonBounds = {
  west: -0.17,
  east: 0.02,
  north: 51.6,
  south: 51.43,
};

function markerPosition([longitude, latitude]: MendEvent["coordinates"]) {
  const x = ((longitude - londonBounds.west) / (londonBounds.east - londonBounds.west)) * 100;
  const y = ((londonBounds.north - latitude) / (londonBounds.north - londonBounds.south)) * 100;

  return {
    left: `${Math.min(94, Math.max(6, x))}%`,
    top: `${Math.min(88, Math.max(10, y))}%`,
  };
}

type SelectedPlace =
  | {
      layer: "second-hand";
      item: MendEvent;
    }
  | {
      layer: "menders";
      item: Mender;
    };

export function App() {
  const [activeLayers, setActiveLayers] = useState<MapLayer[]>(["second-hand", "menders"]);
  const [selectedPlaceId, setSelectedPlaceId] = useState(events[0].id);
  const [detailEventId, setDetailEventId] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const staticMapUrl = token
    ? `https://api.mapbox.com/styles/v1/${mapboxStylePath}/static/-0.075,51.512,10.35,0/1280x900?access_token=${token}`
    : "";

  const visiblePlaces: SelectedPlace[] = useMemo(() => {
    const places: SelectedPlace[] = [];

    if (activeLayers.includes("second-hand")) {
      places.push(...events.map((item) => ({ layer: "second-hand" as const, item })));
    }

    if (activeLayers.includes("menders")) {
      places.push(...menders.map((item) => ({ layer: "menders" as const, item })));
    }

    return places;
  }, [activeLayers]);

  const selectedPlace = useMemo(() => {
    return (
      visiblePlaces.find((place) => place.item.id === selectedPlaceId) ??
      visiblePlaces[0]
    );
  }, [selectedPlaceId, visiblePlaces]);

  const selectedInventory = useMemo(() => {
    if (selectedPlace?.layer !== "second-hand") {
      return [];
    }

    return inventory.filter((item) => item.eventId === selectedPlace.item.id);
  }, [selectedPlace]);

  const detailEvent = detailEventId
    ? events.find((event) => event.id === detailEventId) ?? null
    : null;

  const detailInventory = useMemo(
    () => inventory.filter((item) => item.eventId === detailEvent?.id),
    [detailEvent?.id]
  );

  useEffect(() => {
    if (!visiblePlaces.some((place) => place.item.id === selectedPlaceId)) {
      setSelectedPlaceId(visiblePlaces[0]?.item.id ?? "");
    }
  }, [selectedPlaceId, visiblePlaces]);

  const visibleInventoryCount = activeLayers.includes("second-hand") ? inventory.length : 0;
  const visibleRepairSkillCount = activeLayers.includes("menders")
    ? menders.reduce((total, mender) => total + mender.specialties.length, 0)
    : 0;

  const toggleLayer = (layer: MapLayer) => {
    setActiveLayers((current) => {
      if (current.includes(layer)) {
        return current.length === 1 ? current : current.filter((item) => item !== layer);
      }

      return [...current, layer];
    });
    setDetailEventId(null);
  };

  return (
    <main className="app-shell">
      <section className="map-stage" aria-label="Map of London clothing services">
        {token ? (
          <>
            <div
              className="map-image"
              style={{ backgroundImage: `url("${staticMapUrl}")` }}
            />
            <div className="marker-layer" aria-label="Map markers">
              {visiblePlaces.map((place) => (
                <button
                  key={place.item.id}
                  className={`marker marker-${place.layer} ${
                    place.item.id === selectedPlace?.item.id ? "is-active" : ""
                  }`}
                  style={markerPosition(place.item.coordinates)}
                  onClick={() => setSelectedPlaceId(place.item.id)}
                  aria-label={place.item.name}
                >
                  {place.layer === "menders" ? <Spool size={18} /> : <Shirt size={18} />}
                </button>
              ))}
            </div>
            <a className="mapbox-credit" href="https://www.mapbox.com/" target="_blank" rel="noreferrer">
              Mapbox
            </a>
          </>
        ) : (
          <div className="missing-token">
            <MapPin />
            <h1>Mapbox token missing</h1>
            <p>Add your Mapbox token to `.env` as `MAP=...` or `VITE_MAPBOX_TOKEN=...`.</p>
          </div>
        )}
        <div className="map-shade" />
      </section>

      <aside className="brand-panel" aria-label="Mendmap filters">
        <div className="brand-lockup">
          <div className="logo-mark">
            <Shirt size={21} />
          </div>
          <div>
            <p className="eyebrow">London clothing commons</p>
            <h1>Mendmap</h1>
          </div>
        </div>

        <div className="metric-grid">
          <div>
            <strong>{visiblePlaces.length}</strong>
            <span>places</span>
          </div>
          <div>
            <strong>{visibleInventoryCount + visibleRepairSkillCount}</strong>
            <span>items & skills</span>
          </div>
        </div>

        <button className="mobile-filter-toggle" onClick={() => setFiltersOpen(true)}>
          <ListFilter size={18} />
          Filters
        </button>

        <FilterPanel
          activeLayers={activeLayers}
          onToggle={toggleLayer}
        />
      </aside>

      <section className="event-preview" aria-label="Selected map item preview">
        {!selectedPlace ? (
          <EmptyPreview />
        ) : selectedPlace.layer === "menders" ? (
          <MenderPreview mender={selectedPlace.item} />
        ) : (
          <SecondHandPreview
            event={selectedPlace.item}
            items={selectedInventory}
            onViewEvent={() => setDetailEventId(selectedPlace.item.id)}
          />
        )}
      </section>

      {filtersOpen && (
        <div className="mobile-panel-backdrop" onClick={() => setFiltersOpen(false)}>
          <div className="mobile-panel" onClick={(event) => event.stopPropagation()}>
            <button className="icon-button close-button" onClick={() => setFiltersOpen(false)}>
              <X size={18} />
            </button>
            <FilterPanel
              activeLayers={activeLayers}
              onToggle={(layer) => {
                toggleLayer(layer);
                setFiltersOpen(false);
              }}
            />
          </div>
        </div>
      )}

      {detailEvent && (
        <EventDetail
          event={detailEvent}
          items={detailInventory}
          onClose={() => setDetailEventId(null)}
        />
      )}
    </main>
  );
}

function FilterPanel({
  activeLayers,
  onToggle,
}: {
  activeLayers: MapLayer[];
  onToggle: (layer: MapLayer) => void;
}) {
  const filters: Array<{ layer: MapLayer; label: string; icon: "shirt" | "spool" }> = [
    { layer: "second-hand", label: "Second-hand", icon: "shirt" },
    { layer: "menders", label: "Menders", icon: "spool" },
  ];

  return (
    <div className="filter-panel">
      <div className="section-title">
        <div>
          <p className="eyebrow">Show me</p>
          <h2>Filter map</h2>
        </div>
      </div>
      <div className="filter-list layer-filter-list">
        {filters.map((filter) => {
          const selected = activeLayers.includes(filter.layer);
          const Icon = filter.icon === "spool" ? Spool : Shirt;

          return (
            <button
              key={filter.layer}
              className={`filter-chip layer-chip ${selected ? "is-selected" : ""}`}
              onClick={() => onToggle(filter.layer)}
              aria-pressed={selected}
            >
              <Icon size={16} />
              <span>{filter.label}</span>
              {selected && <Check size={15} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SecondHandPreview({
  event,
  items,
  onViewEvent,
}: {
  event: MendEvent;
  items: typeof inventory;
  onViewEvent: () => void;
}) {
  return (
    <>
      <div className="preview-header">
        <span className="event-type type-second-hand">Second-hand</span>
        <span>{event.borough}</span>
      </div>
      <h2>{event.name}</h2>
      <p>{event.description}</p>
      <div className="info-stack">
        <span>
          <CalendarDays size={16} />
          {event.date}
        </span>
        <span>
          <Clock size={16} />
          {event.time}
        </span>
        <span>
          <MapPin size={16} />
          {event.locationName}
        </span>
      </div>
      <div className="tag-row">
        <span>Second-hand</span>
      </div>
      <div className="preview-strip">
        {items.slice(0, 3).map((item) => (
          <img key={item.id} src={item.imageUrl} alt="" />
        ))}
        <div>
          <strong>{items.length}</strong>
          <span>posted items</span>
        </div>
      </div>
      <button className="primary-action" onClick={onViewEvent}>
        View event
      </button>
    </>
  );
}

function MenderPreview({ mender }: { mender: Mender }) {
  return (
    <>
      <div className="preview-header">
        <span className="event-type type-mender">Mender</span>
        <span>{mender.borough}</span>
      </div>
      <h2>{mender.name}</h2>
      <p>{mender.description}</p>
      <div className="info-stack">
        <span>
          <Clock size={16} />
          {mender.availability}
        </span>
        <span>
          <MapPin size={16} />
          {mender.locationName}
        </span>
      </div>
      <div className="tag-row">
        {mender.specialties.map((category) => (
          <span key={category}>{category}</span>
        ))}
      </div>
      <button className="primary-action" onClick={() => undefined}>
        Contact
      </button>
    </>
  );
}

function EmptyPreview() {
  return (
    <div className="empty-preview">
      <Sparkles size={26} />
      <h2>No matching places</h2>
      <p>Switch filters to bring another London demo layer onto the map.</p>
    </div>
  );
}

function EventDetail({
  event,
  items,
  onClose,
}: {
  event: MendEvent;
  items: typeof inventory;
  onClose: () => void;
}) {
  return (
    <div className="detail-backdrop">
      <article className="detail-panel">
        <div className="detail-hero">
          <button className="back-action" onClick={onClose}>
            <ArrowLeft size={18} />
            Map
          </button>
          <span className="event-type type-second-hand">Second-hand</span>
          <h2>{event.name}</h2>
          <p>{event.description}</p>
          <div className="detail-meta">
            <span>
              <CalendarDays size={16} />
              {event.date}
            </span>
            <span>
              <Clock size={16} />
              {event.time}
            </span>
            <span>
              <MapPin size={16} />
              {event.locationName}
            </span>
          </div>
        </div>

        <div className="detail-content">
          <section>
            <div className="section-title compact">
              <div>
                <p className="eyebrow">Host</p>
                <h3>{event.host}</h3>
              </div>
            </div>
            <div className="tag-row">
              <span>Second-hand</span>
            </div>
          </section>

          <section>
            <div className="section-title compact">
              <div>
                <p className="eyebrow">On offer</p>
                <h3>{items.length} posted items</h3>
              </div>
            </div>
            <div className="item-grid">
              {items.map((item) => (
                <article className="item-card" key={item.id}>
                  <img src={item.imageUrl} alt={item.title} />
                  <div>
                    <span>{item.category}</span>
                    <h4>{item.title}</h4>
                    <p>
                      {item.size} · {item.condition}
                    </p>
                    <small>{item.note}</small>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}
