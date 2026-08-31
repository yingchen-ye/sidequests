import type { Booking } from "../types";
import { HotelIcon, RestaurantIcon } from "./icons";

function formatMoney(cost?: Booking["cost"]) {
  if (!cost) return null;
  return `${cost.amount.toLocaleString()} ${cost.currency}`;
}

export default function BookingCard({ booking }: { booking: Booking }) {
  const isHotel = booking.type === "hotel";
  return (
    <div className="card booking-card">
      <div className="card-icon">{isHotel ? <HotelIcon /> : <RestaurantIcon />}</div>
      <div className="card-body">
        <div className="card-title-row">
          <span className="card-title">{booking.name}</span>
          {formatMoney(booking.cost) && <span className="card-cost">{formatMoney(booking.cost)}</span>}
        </div>
        <div className="card-meta">{booking.address}</div>
        {isHotel && booking.checkIn && booking.checkOut && (
          <div className="card-meta">
            {booking.checkIn} → {booking.checkOut}
          </div>
        )}
        {!isHotel && booking.time && <div className="card-meta">{booking.time}</div>}
        {booking.confirmationNumber && (
          <div className="card-confirmation">Confirmation {booking.confirmationNumber}</div>
        )}
        {booking.notes && <div className="card-notes">{booking.notes}</div>}
      </div>
    </div>
  );
}
