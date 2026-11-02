import { Link } from '@/lib/router';
import { Mail, Phone, MapPin, Linkedin, Github, ArrowRight } from 'lucide-react';
import { GemMark } from '@/components/GemMark';

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-ink-100 bg-paper-200 mt-32">
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 opacity-[0.06]"
        style={{ transform: 'rotateX(20deg)' }}
      >
        <GemMark size={340} interactive={false} spinSpeed={0.008} />
      </div>
      <div className="container-editorial relative py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 font-display text-2xl font-600 text-ink tracking-tight">
              <GemMark size={26} interactive={false} spinSpeed={0.025} />
              GANVORA
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-500">
              AI consulting, automation systems, and custom software. Strategy
              tied to measurable outcomes. Built around your operations.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a href="https://www.linkedin.com/company/ganvora" target="_blank" rel="noopener noreferrer"
                className="text-ink-400 transition-colors hover:text-forest" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="https://github.com/Harshgarg123" target="_blank" rel="noopener noreferrer"
                className="text-ink-400 transition-colors hover:text-forest" aria-label="GitHub">
                <Github size={20} />
              </a>
            </div>
          </div>

          <div>
            <p className="label-mono mb-4">Navigate</p>
            <ul className="space-y-3">
              <li><Link to="/" className="text-sm text-ink-500 hover:text-forest transition-colors">Home</Link></li>
              <li><Link to="/services" className="text-sm text-ink-500 hover:text-forest transition-colors">Services</Link></li>
              <li><Link to="/about" className="text-sm text-ink-500 hover:text-forest transition-colors">About</Link></li>
              <li><Link to="/field-notes" className="text-sm text-ink-500 hover:text-forest transition-colors">Field Notes</Link></li>
              <li><Link to="/contact" className="text-sm text-ink-500 hover:text-forest transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <p className="label-mono mb-4">Contact</p>
            <ul className="space-y-3">
              <li>
                <a href="mailto:ganvoraa@gmail.com" className="flex items-center gap-2 text-sm text-ink-500 hover:text-forest transition-colors">
                  <Mail size={15} /> ganvoraa@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:8827036728" className="flex items-center gap-2 text-sm text-ink-500 hover:text-forest transition-colors">
                  <Phone size={15} /> +918827036728
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-ink-500">
                <MapPin size={15} /> Bangalore India
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-ink-100 pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-ink-400">
            © {new Date().getFullYear()} GANVORA. All rights reserved.
          </p>
          <Link to="/contact" className="flex items-center gap-1.5 text-xs font-medium text-forest hover:gap-2.5 transition-all">
            Start a project <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
