import { useEffect, useState } from 'react';
import { Link, useRouter } from '@/lib/router';
import { Menu, X } from 'lucide-react';
import { GemMark } from '@/components/GemMark';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/field-notes', label: 'Field Notes' },
  { to: '/contact', label: 'Contact' },
];

export function Nav() {
  const { path } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [path]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const isActive = (to: string) => to === '/' ? path === '/' : path.startsWith(to);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen
            ? 'bg-paper/85 backdrop-blur-xl border-b border-ink-100 shadow-premium'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <nav className="container-editorial flex h-16 items-center justify-between sm:h-20">
          <Link to="/" className="flex items-center gap-2.5">
            <GemMark size={30} interactive={false} spinSpeed={0.03} />
            <span className="font-display text-2xl font-600 text-ink tracking-tight">GANVORA</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(link.to) ? 'text-forest' : 'text-ink-500 hover:text-ink'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/contact" className="btn-primary !py-2.5 !px-5 text-sm">
              Start a project
            </Link>
          </div>

          <button
            className="md:hidden text-ink p-2 -mr-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-paper pt-16 md:hidden animate-fade-in">
          <div className="container-editorial flex flex-col gap-2 pt-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`border-b border-ink-100 py-5 text-lg font-medium transition-colors ${
                  isActive(link.to) ? 'text-forest' : 'text-ink'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/contact" className="btn-primary mt-6 w-full">Start a project</Link>
          </div>
        </div>
      )}
    </>
  );
}
