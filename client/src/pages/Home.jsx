import { useState,useEffect } from 'react';
import api from '../utils/axios.js';
import { Link } from 'react-router-dom';

import { ArrowRight, CalendarDays, MapPin, Search, Sparkles, Music2, Laptop, Palette, Utensils, Mic2, GraduationCap } from 'lucide-react';

const categories = [
  { name: 'Music', icon: Music2, color: 'bg-pink-50 text-pink-600' },
  { name: 'Technology', icon: Laptop, color: 'bg-blue-50 text-blue-600' },
  { name: 'Art & Culture', icon: Palette, color: 'bg-amber-50 text-amber-600' },
  { name: 'Food & Drink', icon: Utensils, color: 'bg-orange-50 text-orange-600' },
  { name: 'Comedy', icon: Mic2, color: 'bg-purple-50 text-purple-600' },
  { name: 'Campus', icon: GraduationCap, color: 'bg-green-50 text-green-600' },
];

function Home() {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await api.get('/api/events');
        console.log('Fetched events:', response.data);
        setEvents(response.data);
        console.log('Fetched events:', response.data);
      } catch (err) {
        console.error('Events fetch error:', err);
        setError('Events load nahi ho paaye.');
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  function handleSearch(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const search = formData.get('search')?.toString().trim() || '';
    const location = formData.get('location')?.toString().trim() || '';

    const params = new URLSearchParams();

    if (search) params.set('search', search);
    if (location) params.set('location', location);

    window.location.href = `/events?${params.toString()}`;
  }

  return (
    <main className="bg-white">
      {/* Compact Light Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-white to-fuchsia-50">
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-violet-200/40 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-7 px-5 py-9 sm:gap-10 sm:py-14 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-16">
          {/* Hero Text */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white/80 px-3 py-1.5 text-xs font-semibold text-violet-700 sm:text-sm">
              <Sparkles size={15} />
              Discover experiences near you
            </div>

            <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-gray-950 sm:mt-5 sm:text-5xl lg:text-6xl">
              Find your next reason to{' '}
              <span className="text-violet-600">go out.</span>
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-gray-600 sm:mt-5 sm:text-base sm:leading-7">
              Discover events, meet people who share your interests, and make
              memories worth talking about.
            </p>

            <div className="mt-5 flex flex-wrap gap-3 sm:mt-7">
              <a
                href="/events"
                className="group inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-violet-200 transition hover:bg-violet-700 sm:px-6 sm:py-3.5 sm:text-base"
              >
                Explore Events
                <ArrowRight size={17} className='transition-transform group-hover:translate-x-2'/>
              </a>

              <a
                href="#categories"
                className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-violet-200 hover:bg-violet-50 sm:px-6 sm:py-3.5 sm:text-base"
              >
                Browse Categories
              </a>
            </div>

            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-gray-500 sm:mt-7 sm:text-sm">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Local experiences
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-violet-500" />
                Easy booking
              </span>
            </div>
          </div>

            {/* Visual area: replace with real event image/video later */}
            <div className="relative mx-auto w-full max-w-xl px-4 py-6">
            <div className="relative aspect-[16/10] overflow-visible rounded-2xl border border-white bg-gradient-to-br from-violet-200 via-fuchsia-100 to-orange-100 shadow-xl shadow-violet-100/70 sm:rounded-3xl">
                <div className="absolute -right-8 -top-10 h-48 w-48 rounded-full bg-violet-400/30 blur-2xl sm:h-64 sm:w-64" />
                <div className="absolute -bottom-12 -left-8 h-48 w-48 rounded-full bg-pink-400/30 blur-2xl sm:h-64 sm:w-64" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center sm:p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-violet-600 shadow-md sm:h-16 sm:w-16">
                    <CalendarDays size={30} />
                </div>

                <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-violet-700 sm:text-sm">
                    Make it memorable
                </p>

                <h2 className="mt-2 text-2xl font-extrabold leading-tight text-gray-900 sm:text-4xl">
                    Life happens
                    <br />
                    at events.
                </h2>

                <p className="mt-3 max-w-xs text-xs leading-5 text-gray-600 sm:text-sm">
                    Find something exciting to experience next.
                </p>
                </div>

                <div className="absolute -bottom-6 -left-4 flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-[0_15px_30px_rgba(109,40,217,0.15)] transition-transform duration-300 hover:-translate-y-1 sm:-bottom-8 sm:-left-6 sm:p-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-50 text-pink-600 sm:h-12 sm:w-12">
                    <Music2 size={22} />
                </span>
                <span className="pr-2">
                    <span className="block text-xs font-bold text-gray-900 sm:text-sm">
                    Your next experience
                    </span>
                    <span className="block text-[10px] text-gray-500 sm:text-xs">
                    Starts with EventJi
                    </span>
                </span>
                </div>

            </div>
            </div>


        </div>
      </section>

      {/* Search Bar */}
      <section className="relative z-10 mx-auto max-w-7xl px-5 pt-5 sm:pt-7 lg:px-8">
        <form
          onSubmit={handleSearch}
          className="grid gap-2 rounded-2xl border border-gray-100 bg-white p-2 shadow-lg shadow-gray-200/50 sm:grid-cols-[1fr_1fr_auto] sm:gap-3 sm:p-3"
        >
          <label className="flex min-w-0 items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-gray-50 sm:px-4">
            <Search size={21} className="shrink-0 text-violet-600" />
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-bold uppercase tracking-wide text-gray-500">
                Find an event
              </span>
              <input
                name="search"
                type="text"
                placeholder="Concerts, workshops, tech..."
                className="mt-1 w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
              />
            </span>
          </label>

          <label className="flex min-w-0 items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-gray-50 sm:px-4">
            <MapPin size={21} className="shrink-0 text-violet-600" />
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-bold uppercase tracking-wide text-gray-500">
                Location
              </span>
              <input
                name="location"
                type="text"
                placeholder="Enter a city"
                className="mt-1 w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
              />
            </span>
          </label>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3.5 font-semibold text-white transition hover:bg-violet-700 sm:px-7"
          >
            <Search size={18} />
            Search Events
          </button>
        </form>
      </section>

      {/* Categories */}
      <section id="categories" className="mx-auto max-w-7xl px-5 py-12 sm:py-16 lg:px-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600 sm:text-sm">
            Explore your interests
          </p>

          <div className="mt-2 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-950 sm:text-3xl lg:text-4xl">
              What are you in the mood for?
            </h2>
            <p className="text-sm text-gray-500">
              Find experiences that feel like you.
            </p>
          </div>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {categories.map(({ name, icon: Icon, color }) => (
            <a
              key={name}
              href={`/events?category=${encodeURIComponent(name)}`}
              className="group flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-4 text-center transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-100/60 sm:p-5"
            >
              <span className={`flex h-12 w-12 items-center justify-center rounded-2xl sm:h-14 sm:w-14 ${color} transition group-hover:scale-110`}>
                <Icon size={24} />
              </span>
              <span className="mt-3 text-sm font-semibold text-gray-800">
                {name}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="bg-gray-50 px-5 py-12 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600 sm:text-sm">
            "Chalo kuchh yadgar karte hai" 
          </p>

          <div className="mt-2 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-gray-950 sm:text-3xl lg:text-4xl">
                Events you might love
              </h2>
              <p className="mt-2 text-sm text-gray-600 sm:text-base">
                कुछ बहुत बढ़िया आपका इंतज़ार कर रहा है!
              </p>
            </div>

            <a
              href="/events"
              className="inline-flex items-center gap-2 text-sm font-semibold text-violet-700 hover:text-violet-900"
            >
              View all events <ArrowRight size={17} />
            </a>
          </div>

          <div className="mt-7">
            {/* Loading state */}
            {loading && (
              <p className="py-10 text-center text-gray-500">
                Events load ho rahe hain...
              </p>
            )}

            {/* Error state */}
            {!loading && error && (
              <p className="py-10 text-center text-red-600">
                {error}
              </p>
            )}

            {/* Empty state */}
            {!loading && !error && events.length === 0 && (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-10 text-center">
                <CalendarDays
                  size={34}
                  className="mx-auto text-violet-500"
                />
                <h3 className="mt-3 font-bold text-gray-900">
                  Abhi koi event available nahi hai
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Naye events ke liye baad mein check karna.
                </p>
              </div>
            )}

            {/* Event cards */}
            {!loading && !error && events.length > 0 && (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                  <div
                    key={event._id}
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    {/* Event image */}
                    {event.imageUrl ? (
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="h-48 w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-48 items-center justify-center bg-violet-50">
                        <CalendarDays
                          size={48}
                          className="text-violet-400"
                        />
                      </div>
                    )}

                    {/* Event details */}
                    <div className="p-5">
                      <p className="text-xs font-bold uppercase tracking-wider text-violet-600">
                        {event.category}
                      </p>

                      <h3 className="mt-2 text-lg font-bold text-gray-900">
                        {event.title}
                      </h3>

                      <div className="mt-3 space-y-2 text-sm text-gray-600">
                        <p className="flex items-center gap-2">
                          <CalendarDays size={16} className="shrink-0" />
                          {new Date(event.date).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>

                        <p className="flex items-center gap-2">
                          <MapPin size={16} className="shrink-0" />
                          {event.location}
                        </p>
                      </div>

                      <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                        <div>
                          <p className="font-bold text-gray-900">
                            {event.ticketPrice === 0
                              ? "Free"
                              : `₹${event.ticketPrice}`}
                          </p>
                          <p className="text-xs text-gray-500">
                            {event.availableSeats} seats left
                          </p>
                        </div>

                        <Link
                          to={`/events/${event._id}`}
                          className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-700"
                        >
                          View Event
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </section>
    </main>
  );
}

export default Home;
