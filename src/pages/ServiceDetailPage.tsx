import { Link } from '@/lib/router';
import { AnimatedSection } from '@/components/AnimatedSection';
import { ContactForm } from '@/components/ContactForm';
import { ServiceIcon, ServiceDemo } from '@/components/ServiceDemos';
import { Tilt3D } from '@/components/Tilt3D';
import { services } from '@/lib/content';
import { Check, ArrowRight, ArrowLeft, Play } from 'lucide-react';

export function ServiceDetailPage({ slug }: { slug: string }) {
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <section className="container-editorial pt-32 pb-32 text-center">
        <h1 className="font-display text-3xl font-500 text-ink">Service not found</h1>
        <Link to="/services" className="btn-secondary mt-8">
          <ArrowLeft size={16} /> Back to services
        </Link>
      </section>
    );
  }

  const otherServices = services.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <section className="container-editorial pt-24 sm:pt-32">
        <Link to="/services" className="flex items-center gap-2 text-sm text-ink-400 hover:text-ink transition-colors">
          <ArrowLeft size={15} /> All services
        </Link>

        <div className="mt-10 flex items-center gap-3">
          <span className="rounded-full bg-paper-200 px-3 py-1 text-xs font-medium text-ink-500">{service.category}</span>
          <span className="font-mono text-xs text-ink-300">Service 0{services.findIndex((s) => s.slug === slug) + 1} / {services.length}</span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[auto_1fr] lg:gap-12">
          <div className="perspective-1000">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl border border-ink-100 bg-paper-200 animate-float-3d"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <ServiceIcon icon={service.icon} size={28} className="text-forest" />
            </div>
          </div>
          <div className="max-w-2xl">
            <h1 className="font-display text-display-lg font-400 text-ink text-balance">
              {service.name}
            </h1>
            <p className="mt-3 text-xl text-forest font-medium">{service.tagline}</p>
            <p className="mt-6 text-base leading-relaxed text-ink-500">{service.description}</p>
          </div>
        </div>
      </section>

      <section className="container-editorial mt-20">
        <AnimatedSection>
          <div className="flex items-center gap-2 mb-6">
            <Play size={16} className="text-forest" />
            <p className="label-mono-accent">Live Demo</p>
          </div>
          <ServiceDemo demoType={service.demoType} />
        </AnimatedSection>
      </section>

      <section className="container-editorial mt-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <AnimatedSection>
            <div>
              <p className="label-mono mb-1">01 · Who it's for</p>
              <span className="mb-4 block h-px w-8 bg-forest" />
              <p className="text-base leading-relaxed text-ink-500">{service.whoItsFor}</p>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div>
              <p className="label-mono mb-1">02 · What's included</p>
              <span className="mb-4 block h-px w-8 bg-forest" />
              <ul className="space-y-3">
                {service.whatsIncluded.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-ink-500">
                    <Check size={16} className="mt-0.5 shrink-0 text-forest" strokeWidth={2} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="container-editorial mt-20">
        <AnimatedSection>
          <Tilt3D max={4} lift={12} scale={1}>
            <div className="depth-panel p-8 sm:p-12">
              <p className="label-mono mb-1">03 · Engagement</p>
              <span className="mb-4 block h-px w-8 bg-forest" />
              <p className="font-display text-2xl font-500 text-ink" style={{ transform: 'translateZ(16px)' }}>{service.engagement}</p>
              <p className="mt-4 text-sm text-ink-500 max-w-xl">
                Every proposal includes a fixed scope and price. No hourly billing,
                no surprise invoices. You know exactly what you're getting before we start.
              </p>
            </div>
          </Tilt3D>
        </AnimatedSection>
      </section>

      <section className="container-editorial mt-20" id="contact">
        <AnimatedSection>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="label-mono mb-1">04 · Get started</p>
              <span className="block h-px w-8 bg-forest" />
              <h2 className="mt-4 font-display text-display-sm font-400 text-ink">
                Interested in this one?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-500">
                Fill out the form and we'll send a scoped proposal within
                3 business days. Or book a call first if you have questions.
              </p>
            </div>
            <div><ContactForm /></div>
          </div>
        </AnimatedSection>
      </section>

      <section className="container-editorial mt-20">
        <AnimatedSection>
          <p className="label-mono mb-1">Other services</p>
          <span className="mb-8 block h-px w-8 bg-forest" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {otherServices.map((s) => (
              <Tilt3D key={s.slug} max={7} lift={12}>
                <Link
                  to={`/services/${s.slug}`}
                  className="group card-premium flex h-full flex-col p-6"
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-ink-100 bg-paper-200 transition-colors group-hover:border-forest-100 group-hover:bg-forest-50"
                    style={{ transform: 'translateZ(16px)' }}
                  >
                    <ServiceIcon icon={s.icon} size={18} className="text-ink-500 group-hover:text-forest transition-colors" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-500 text-ink">{s.name}</h3>
                  <p className="mt-1 text-sm text-ink-500">{s.tagline}</p>
                  <div className="mt-3 flex items-center gap-1 text-sm font-medium text-forest">
                    Learn more <ArrowRight size={14} />
                  </div>
                </Link>
              </Tilt3D>
            ))}
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
