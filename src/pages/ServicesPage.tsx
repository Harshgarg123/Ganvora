import { useMemo, useState } from 'react';
import { Link } from '@/lib/router';
import { AnimatedSection } from '@/components/AnimatedSection';
import { ServiceIcon } from '@/components/ServiceDemos';
import { Tilt3D } from '@/components/Tilt3D';
import { services } from '@/lib/content';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const categories = ['All', 'AI', 'Systems', 'Engineering'] as const;

export function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>('All');

  const filteredServices = useMemo(
    () =>
      activeCategory === 'All'
        ? services
        : services.filter((service) => service.category === activeCategory),
    [activeCategory]
  );

  return (
    <section className="container-editorial pt-24 pb-32 sm:pt-32">
      <AnimatedSection>
        <div className="max-w-2xl">
          <p className="label-mono">Services</p>
          <h1 className="mt-6 font-display text-display-xl font-400 text-ink text-balance">
            Nine ways we build.
          </h1>
          <p className="mt-8 text-lg leading-relaxed text-ink-500">
            From AI strategy to custom SaaS platforms — each service is a
            complete, scoped engagement with a clear outcome and a live demo
            so you can see the work before you buy it.
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <Tilt3D max={5} lift={10} scale={1}>
          <div className="depth-panel flex items-baseline gap-6 px-8 py-8">
            <span className="font-display text-7xl font-500 leading-none text-forest sm:text-8xl" style={{ transform: 'translateZ(20px)' }}>09</span>
            <p className="max-w-xs text-sm leading-relaxed text-ink-500">
              Distinct service lines, each a complete engagement with its own
              scope, deliverables, and live demo.
            </p>
          </div>
        </Tilt3D>
      </AnimatedSection>

      <div className="mt-14 flex flex-wrap gap-2" role="tablist" aria-label="Filter services by category">
        {categories.map((cat) => {
          const isActive = cat === activeCategory;
          return (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'border-forest bg-forest text-paper-50'
                  : 'border-ink-200 bg-paper-50 text-ink-500 hover:border-ink-400 hover:text-ink'
              }`}
            >
              {cat}
              {cat !== 'All' && (
                <span className={`ml-1.5 font-mono text-xs ${isActive ? 'text-paper-100' : 'text-ink-300'}`}>
                  {services.filter((s) => s.category === cat).length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <p className="mt-6 font-mono text-xs uppercase tracking-[0.15em] text-ink-400">
        Showing {filteredServices.length} of {services.length}
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {filteredServices.map((service) => {
          const originalIndex = services.findIndex((s) => s.slug === service.slug);
          return (
            <AnimatedSection key={service.slug}>
              <Tilt3D max={6} lift={12} scale={1.008}>
                <Link
                  to={`/services/${service.slug}`}
                  className="group card-feature flex flex-col p-8 sm:p-10"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-ink-400">0{originalIndex + 1}</span>
                    <span className="rounded-full bg-paper-200 px-2.5 py-1 text-xs font-medium text-ink-500">
                      {service.category}
                    </span>
                  </div>
                  <div
                    className="mt-6 flex h-14 w-14 items-center justify-center rounded-xl border border-ink-100 bg-paper-200 transition-all duration-500 group-hover:border-forest-100 group-hover:bg-forest-50"
                    style={{ transform: 'translateZ(18px)' }}
                  >
                    <ServiceIcon icon={service.icon} size={26} className="text-ink-500 transition-colors group-hover:text-forest" />
                  </div>
                  <h2 className="mt-6 font-display text-2xl font-500 text-ink">{service.name}</h2>
                  <p className="mt-2 text-base text-forest font-medium">{service.tagline}</p>
                  <p className="mt-4 text-sm leading-relaxed text-ink-500">{service.description}</p>
                  <p className="mt-4 flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.1em] text-ink-400">
                    <span className="h-px w-3 bg-forest" />
                    {service.whatsIncluded.length} deliverables included
                  </p>
                  <div className="mt-6 flex items-center justify-between border-t border-ink-100 pt-4">
                    <span className="text-xs text-ink-400">{service.engagement}</span>
                    <span className="flex items-center gap-1.5 text-sm font-medium text-forest">
                      View demo <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </Tilt3D>
            </AnimatedSection>
          );
        })}
      </div>

      {filteredServices.length === 0 && (
        <div className="mt-6 rounded-2xl border border-ink-100 bg-paper-200 px-6 py-16 text-center">
          <p className="text-sm text-ink-500">No services in this category yet.</p>
        </div>
      )}

      <AnimatedSection>
        <div className="mt-16 rounded-3xl border border-forest-100 bg-forest-50 p-10 sm:p-16 text-center">
          <h2 className="font-display text-display-sm font-400 text-ink">
            Not sure which one you need?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-ink-500">
            Book a free 30-minute discovery call. We'll tell you which service
            fits — or if you need something else entirely. No sales pressure.
          </p>
          <Link to="/contact" className="btn-primary mt-8">
            Book a call <ArrowRight size={16} />
          </Link>
        </div>
      </AnimatedSection>
    </section>
  );
}
