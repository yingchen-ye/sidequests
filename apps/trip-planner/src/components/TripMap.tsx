import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import type { DayPlan, Coordinates } from "../types";

// Leaflet's default marker icons reference image files that don't resolve
// correctly through bundlers; point them at the CDN copies instead.
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

interface Pin {
  key: string;
  position: Coordinates;
  label: string;
  detail?: string;
}

function collectPins(days: DayPlan[]): Pin[] {
  const pins: Pin[] = [];
  days.forEach((day, dayIndex) => {
    day.bookings.forEach((booking, i) => {
      if (booking.coordinates) {
        pins.push({
          key: `b-${dayIndex}-${i}`,
          position: booking.coordinates,
          label: booking.name,
          detail: booking.address,
        });
      }
      if (booking.departureCoordinates) {
        pins.push({
          key: `b-${dayIndex}-${i}-dep`,
          position: booking.departureCoordinates,
          label: `${booking.name} — departure`,
          detail: booking.departureLocation,
        });
      }
      if (booking.arrivalCoordinates) {
        pins.push({
          key: `b-${dayIndex}-${i}-arr`,
          position: booking.arrivalCoordinates,
          label: `${booking.name} — arrival`,
          detail: booking.arrivalLocation,
        });
      }
    });
    day.experiences.forEach((experience, i) => {
      if (experience.coordinates) {
        pins.push({
          key: `e-${dayIndex}-${i}`,
          position: experience.coordinates,
          label: experience.title,
          detail: experience.description,
        });
      }
    });
  });
  return pins;
}

function FitBounds({ pins }: { pins: Pin[] }) {
  const map = useMap();
  useEffect(() => {
    if (pins.length === 0) return;
    const bounds = L.latLngBounds(pins.map((p) => [p.position.lat, p.position.lng]));
    map.fitBounds(bounds, { padding: [32, 32] });
  }, [pins, map]);
  return null;
}

export default function TripMap({ days }: { days: DayPlan[] }) {
  const pins = collectPins(days);
  const center: [number, number] = pins.length
    ? [pins[0].position.lat, pins[0].position.lng]
    : [35.0, 105.0];

  return (
    <div className="map-wrap">
      <MapContainer center={center} zoom={5} scrollWheelZoom style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds pins={pins} />
        {pins.map((pin) => (
          <Marker key={pin.key} position={[pin.position.lat, pin.position.lng]} icon={markerIcon}>
            <Popup>
              <strong>{pin.label}</strong>
              {pin.detail && <div>{pin.detail}</div>}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
