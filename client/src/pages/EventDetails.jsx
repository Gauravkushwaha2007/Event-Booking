
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CalendarDays, MapPin, ArrowLeft } from 'lucide-react';
import api from '../utils/axios';

function EventDetails() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchEvent() {
      try {
        const response = await api.get(`/api/events/${id}`);
        setEvent(response.data);
      } catch (err) {
        console.error('Event details error:', err);
        setError('Event details load nahi ho paayi.');
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [id]);

  if (loading) {
    return <p className="p-10 text-center">Loading event...</p>;
  }

  if (error || !event) {
    return (
      <div className="p-10 text-center">
        <p className="text-red-600">{error || 'Event nahi mila.'}</p>
        <Link to="/" className="mt-4 inline-block text-violet-700">
          Home par wapas jao
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-5 py-10">
      <div className="mx-auto max-w-4xl">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-violet-700"
        >
          <ArrowLeft size={17} />
          Back to Home
        </Link>

        {event.imageUrl && (
          <img
            src={event.imageUrl}
            alt={event.title}
            className="h-64 w-full rounded-2xl object-cover sm:h-96"
          />
        )}

        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <p className="text-sm font-bold uppercase text-violet-600">
            {event.category}
          </p>

          <h1 className="mt-2 text-3xl font-extrabold text-gray-900">
            {event.title}
          </h1>

          <p className="mt-4 whitespace-pre-line text-gray-600">
            {event.description || event.discription || 'No description available.'}
          </p>

          <div className="mt-6 space-y-3 text-gray-700">
            <p className="flex items-center gap-3">
              <CalendarDays size={19} />
              {new Date(event.date).toLocaleString('en-IN')}
            </p>

            <p className="flex items-center gap-3">
              <MapPin size={19} />
              {event.location}
            </p>
          </div>

          <div className="mt-6 border-t pt-5">
            <p className="text-2xl font-extrabold text-gray-900">
              {event.ticketPrice === 0 ? 'Free' : `₹${event.ticketPrice}`}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              {event.availableSeats} seats available
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default EventDetails;
