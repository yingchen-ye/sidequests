import type { Booking } from "../types";
import { HotelIcon, PlaneIcon, RestaurantIcon, TrainIcon } from "./icons";

function formatMoney(cost?: Booking["cost"]) {
  if (!cost) return null;
  return `${cost.amount.toLocaleString()} ${cost.currency}`;
}

export default function BookingCard({ booking }: { booking: Booking }) {
  const isHotel = booking.type === "hotel";
  const isTransportation = booking.type === "transportation";
  return (
    <div className={`card booking-card type-${booking.type}`}>
      <div className={`card-icon type-${booking.type}`}>
        {isTransportation ? (
          booking.transportMode === "train" ? <TrainIcon /> : <PlaneIcon />
        ) : isHotel ? (
          <HotelIcon />
        ) : (
          <RestaurantIcon />
        )}
      </div>
      <div className="card-body">
        <div className="card-title-row">
          <span className="card-title">{booking.name}</span>
          <span className="card-title-meta">
            {formatMoney(booking.cost) && <span className="card-cost">{formatMoney(booking.cost)}</span>}
            {isTransportation && booking.legView && (
              <span className="leg-badge type-transportation">
                {booking.legView === "departure" ? "Depart" : "Arrival"}
              </span>
            )}
            {isHotel && booking.nightIndex && booking.nightsTotal && (
              <span className="leg-badge type-hotel">
                {booking.nightIndex}/{booking.nightsTotal}
              </span>
            )}
          </span>
        </div>
        {booking.address && <div className="card-meta">{booking.address}</div>}
        {isHotel && booking.checkIn && booking.checkOut && (
          <div className="card-meta">
            <span className="nowrap">{booking.checkIn}</span> → <span className="nowrap">{booking.checkOut}</span>
          </div>
        )}
        {!isHotel && !isTransportation && booking.time && <div className="card-meta">{booking.time}</div>}
        {isTransportation && booking.legView !== "arrival" && booking.departureLocation && (
          <div className="card-meta">
            {!booking.legView && (
              <span className="leg-badge type-transportation leg-badge-inline">Depart</span>
            )}
            {booking.departureLocation}
            {booking.departureTime && (
              <>
                {" · "}
                <span className="nowrap">
                  {booking.departureDate} {booking.departureTime}
                </span>
              </>
            )}
          </div>
        )}
        {isTransportation && booking.legView !== "departure" && booking.arrivalLocation && (
          <div className="card-meta">
            {!booking.legView && (
              <span className="leg-badge type-transportation leg-badge-inline">Arrival</span>
            )}
            {booking.arrivalLocation}
            {booking.arrivalTime && (
              <>
                {" · "}
                <span className="nowrap">
                  {booking.arrivalDate} {booking.arrivalTime}
                </span>
              </>
            )}
          </div>
        )}
        {booking.confirmationNumber && (
          <div className={`card-confirmation type-${booking.type}`}>Confirmation {booking.confirmationNumber}</div>
        )}
        {booking.notes && <div className="card-notes">{booking.notes}</div>}
      </div>
    </div>
  );
}
