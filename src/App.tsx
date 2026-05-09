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
  X,
} from "lucide-react";
import { categories, ClothingCategory, events, inventory, MendEvent } from "./data";

const token = import.meta.env.MAP || import.meta.env.VITE_MAPBOX_TOKEN;
const mapboxStylePath = "annamakesmapbox/cmoyf4wr2002001s7aavbhqdk";

const typeClass: Record<MendEvent["type"], string> = {
  Swap: "type-swap",
  Repair: "type-repair",
  Donation: "type-donation",
  Market: "type-market",
};

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

export function App() {
  const [selectedCategories, setSelectedCategories] = useState<ClothingCategory[]>([]);
  const [selectedEventId, setSelectedEventId] = useState(events[0].id);
  const [detailEventId, setDetailEventId] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const staticMapUrl = token
    ? `https://api.mapbox.com/styles/v1/${mapboxStylePath}/static/-0.075,51.512,10.35,0/1280x900?access_token=${token}`
    : "";

  const selectedEvent = events.find((event) => event.id === selectedEventId) ?? events[0];
  const detailEvent = detailEventId
    ? events.find((event) => event.id === detailEventId) ?? null
    : null;

  const filteredEvents = useMemo(() => {
    if (selectedCategories.length === 0) {
      return events;
    }

    return events.filter((event) =>
      event.lookingFor.some((category) => selectedCategories.includes(category))
    );
  }, [selectedCategories]);

  const selectedInventory = useMemo(
    () => inventory.filter((item) => item.eventId === selectedEvent.id),
    [selectedEvent.id]
  );

  const detailInventory = useMemo(
    () => inventory.filter((item) => item.eventId === detailEvent?.id),
    [detailEvent?.id]
  );

  useEffect(() => {
    if (filteredEvents.length === 0) {
      return;
    }

    if (!filteredEvents.some((event) => event.id === selectedEventId)) {
      setSelectedEventId(filteredEvents[0].id);
    }
  }, [filteredEvents, selectedEventId]);

  const toggleCategory = (category: ClothingCategory) => {
    setSelectedCategories((current) =>
      current.includes(category)
        ? current.filter((selected) => selected !== category)
        : [...current, category]
    );
  };

  const visibleInventoryCount = inventory.filter((item) =>
    filteredEvents.some((event) => event.id === item.eventId)
  ).length;

  return (
    <main className="app-shell">
      <section className="map-stage" aria-label="Map of London clothing events">
        {token ? (
          <>
            <div
              className="map-image"
              style={{ backgroundImage: `url("${staticMapUrl}")` }}
            />
            <div className="marker-layer" aria-label="Event markers">
              {filteredEvents.map((event) => (
                <button
                  key={event.id}
                  className={`marker ${event.id === selectedEventId ? "is-active" : ""}`}
                  style={markerPosition(event.coordinates)}
                  onClick={() => setSelectedEventId(event.id)}
                  aria-label={event.name}
                >
                  <span>{event.lookingFor.length}</span>
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

      <aside className="brand-panel" aria-label="Mendmap event filters">
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
            <strong>{filteredEvents.length}</strong>
            <span>events</span>
          </div>
          <div>
            <strong>{visibleInventoryCount}</strong>
            <span>items</span>
          </div>
        </div>

        <button className="mobile-filter-toggle" onClick={() => setFiltersOpen(true)}>
          <ListFilter size={18} />
          Filters
        </button>

        <FilterPanel
          selectedCategories={selectedCategories}
          onToggle={toggleCategory}
          onClear={() => setSelectedCategories([])}
        />
      </aside>

      <section className="event-preview" aria-label="Selected event preview">
        {filteredEvents.length === 0 ? (
          <EmptyPreview onClear={() => setSelectedCategories([])} />
        ) : (
          <>
            <div className="preview-header">
              <span className={`event-type ${typeClass[selectedEvent.type]}`}>
                {selectedEvent.type}
              </span>
              <span>{selectedEvent.borough}</span>
            </div>
            <h2>{selectedEvent.name}</h2>
            <p>{selectedEvent.description}</p>
            <div className="info-stack">
              <span>
                <CalendarDays size={16} />
                {selectedEvent.date}
              </span>
              <span>
                <Clock size={16} />
                {selectedEvent.time}
              </span>
              <span>
                <MapPin size={16} />
                {selectedEvent.locationName}
              </span>
            </div>
            <div className="tag-row">
              {selectedEvent.lookingFor.map((category) => (
                <span key={category}>{category}</span>
              ))}
            </div>
            <div className="preview-strip">
              {selectedInventory.slice(0, 3).map((item) => (
                <img key={item.id} src={item.imageUrl} alt="" />
              ))}
              <div>
                <strong>{selectedInventory.length}</strong>
                <span>posted items</span>
              </div>
            </div>
            <button className="primary-action" onClick={() => setDetailEventId(selectedEvent.id)}>
              View event
            </button>
          </>
        )}
      </section>

      {filtersOpen && (
        <div className="mobile-panel-backdrop" onClick={() => setFiltersOpen(false)}>
          <div className="mobile-panel" onClick={(event) => event.stopPropagation()}>
            <button className="icon-button close-button" onClick={() => setFiltersOpen(false)}>
              <X size={18} />
            </button>
            <FilterPanel
              selectedCategories={selectedCategories}
              onToggle={toggleCategory}
              onClear={() => setSelectedCategories([])}
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
  selectedCategories,
  onToggle,
  onClear,
}: {
  selectedCategories: ClothingCategory[];
  onToggle: (category: ClothingCategory) => void;
  onClear: () => void;
}) {
  return (
    <div className="filter-panel">
      <div className="section-title">
        <div>
          <p className="eyebrow">Looking for</p>
          <h2>Filter events</h2>
        </div>
        {selectedCategories.length > 0 && (
          <button className="text-button" onClick={onClear}>
            Clear
          </button>
        )}
      </div>
      <div className="filter-list">
        {categories.map((category) => {
          const selected = selectedCategories.includes(category);
          return (
            <button
              key={category}
              className={`filter-chip ${selected ? "is-selected" : ""}`}
              onClick={() => onToggle(category)}
            >
              <span>{category}</span>
              {selected && <Check size={15} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function EmptyPreview({ onClear }: { onClear: () => void }) {
  return (
    <div className="empty-preview">
      <Sparkles size={26} />
      <h2>No matching events</h2>
      <p>Try clearing filters to bring the full London demo set back onto the map.</p>
      <button className="primary-action" onClick={onClear}>
        Clear filters
      </button>
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
          <span className={`event-type ${typeClass[event.type]}`}>{event.type}</span>
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
              {event.lookingFor.map((category) => (
                <span key={category}>{category}</span>
              ))}
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
