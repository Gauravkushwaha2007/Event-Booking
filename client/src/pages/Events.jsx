
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import api from '../utils/axios';
import EventCard from '../components/EventCard';

function Events() {
  const [searchParams] = useSearchParams();

  const search = searchParams.get('search') || '';
  const location = searchParams.get('location') || '';
  const category = searchParams.get('category') || '';

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      setError('');

      try {
        const response = await api.get('/api/events', {
          params: {
            search: search || undefined,
            location: location || undefined,
            category: category || undefined,
          },
        });

        setEvents(response.data);
      } catch (err) {
        console.error('Events fetch error:', err);
        setError('Events load nahi ho paaye.');
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, [search, location, category]);

  const heading = category
    ? `${category} Events`
    : search
      ? `Results for "${search}"`
      : 'Explore Events';

  return (
    <main className="min-h-screen bg-gray-50 px-5 py-10 sm:py-14">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/"
          className="text-sm font-semibold text-violet-700 hover:text-violet-900"
        >
          ← Back to Home
        </Link>

        <div className="mt-6">
          <h1 className="text-3xl font-extrabold text-gray-950 sm:text-4xl">
            {heading}
          </h1>

          {location && (
            <p className="mt-2 text-gray-500">
              Location: {location}
            </p>
          )}

          <p className="mt-2 text-sm text-gray-500">
            {loading ? 'Finding events...' : `${events.length} events found`}
          </p>
        </div>

        {loading && (
          <p className="py-16 text-center text-gray-500">
            Loading events...
          </p>
        )}

        {!loading && error && (
          <p className="py-16 text-center text-red-600">
            {error}
          </p>
        )}

        {!loading && !error && events.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}

        {!loading && !error && events.length === 0 && (
          <div className="py-20 text-center">
            <Search
              size={42}
              className="mx-auto text-violet-400"
            />

            <h2 className="mt-4 text-xl font-bold text-gray-900">
              No events found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Try another event name or location.
            </p>

            <Link
              to="/"
              className="mt-5 inline-block rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700"
            >
              Search Again
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

export default Events;
