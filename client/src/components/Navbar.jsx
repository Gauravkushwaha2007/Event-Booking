
import { CalendarDays, Menu, X, ArrowRight } from 'lucide-react';
import { useState } from 'react';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        {/* EventJi Brand */}
        <a href="/" className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white shadow-lg shadow-violet-200">
            <CalendarDays size={22} />
          </span>

          <span className="text-2xl font-extrabold tracking-tight text-gray-950">
            Event<span className="text-violet-600">Ji</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <a href="/" className="font-semibold text-violet-600">
            Home
          </a>

          <a href="/events" className="font-medium text-gray-600 transition hover:text-violet-600">
            Explore Events
          </a>

          <a href="/my-bookings" className="font-medium text-gray-600 transition hover:text-violet-600">
            My Bookings
          </a>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <a href="/login" className="rounded-xl px-4 py-2.5 font-semibold text-gray-700 transition hover:bg-gray-100">
            Log in
          </a>

          <a href="/register" className="inline-flex items-center gap-2 rounded-xl border-2 border-violet-600 px-5 py-3 font-semibold text-violet-600 shadow-md shadow-violet-200 transition hover:bg-violet-700 hover:text-white">
            Get Started
            <ArrowRight size={17} />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-xl p-2 text-gray-700 hover:bg-gray-100 md:hidden">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-gray-100 bg-white px-5 py-5 md:hidden">
          <div className="flex flex-col gap-2">
            <a href="/" onClick={closeMenu} className="rounded-lg p-3 hover:bg-violet-50">
             Home </a>
            <a href="/events" onClick={closeMenu} className="rounded-lg p-3 hover:bg-violet-50">
             Explore Events </a>
            <a href="/my-bookings" onClick={closeMenu} className="rounded-lg p-3 hover:bg-violet-50">
             My Bookings </a>
            <a href="/login" onClick={closeMenu} className="rounded-lg p-3 hover:bg-violet-50">
             Log in </a>
            <a href="/register" onClick={closeMenu} className="mt-2 rounded-xl border-b border-violet-600 bg-violet-50 p-3 text-center font-semibold text-violet-600 ">
              Get Started </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
