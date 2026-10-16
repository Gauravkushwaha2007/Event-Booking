
import { CalendarDays, MapPin, ArrowUpRight } from 'lucide-react';

function EventCard({ event }) {
  const eventDate = event.date
    ? new Date(event.date)
    : null;

  const validDate =
    eventDate && !Number.isNaN(eventDate.getTime());

  const formattedDate = validDate
    ? eventDate.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : 'Date to be announced';

  const isFree =
    event.eventType === 'free' ||
    Number(event.ticketPrice) === 0;

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-100/70">
      {/* Event Image */}
      <a
        href={`/events/${event._id}`}
        className="relative block aspect-[16/10] overflow-hidden bg-violet-50"
      >
        <img
          src={
            event.imageUrl ||
            'https://placehold.co/800x500/e9e3ff/6d28d9?text=EventJi'
          }
          alt={event.title || 'Event'}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <span className="absolute left-3 top-3 rounded-lg bg-white/95 px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-sm">
          {event.category || 'Event'}
        </span>

        <span
          className={`absolute right-3 top-3 rounded-lg px-3 py-1.5 text-xs font-bold ${
            isFree
              ? 'bg-green-100 text-green-700'
              : 'bg-white/95 text-violet-700'
          }`}
        >
          {isFree ? 'FREE' : `₹${event.ticketPrice}`}
        </span>
      </a>

      {/* Event Information */}
      <div className="p-4 sm:p-5">
        <div className="flex items-center gap-2 text-xs font-semibold text-violet-600">
          <CalendarDays size={15} />
          <span>{formattedDate}</span>
        </div>

        <a href={`/events/${event._id}`}>
          <h3 className="mt-3 line-clamp-2 text-lg font-bold leading-snug text-gray-900 transition group-hover:text-violet-700">
            {event.title || 'Untitled event'}
          </h3>
        </a>

        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-gray-500">
          {event.description ||
            event.discription ||
            'Discover this experience with EventJi.'}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
          <div className="flex min-w-0 items-center gap-2 text-sm text-gray-500">
            <MapPin size={16} className="shrink-0 text-violet-500" />
            <span className="truncate">
              {event.location || 'Location to be announced'}
            </span>
          </div>

          <a
            href={`/events/${event._id}`}
            aria-label={`View ${event.title || 'event'}`}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-50 text-violet-700 transition hover:bg-violet-600 hover:text-white"
          >
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </article>
  );
}

export default EventCard;
