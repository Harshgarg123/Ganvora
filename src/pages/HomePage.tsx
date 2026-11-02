import { Link } from '@/lib/router';
import { AnimatedSection } from '@/components/AnimatedSection';
import { ContactForm } from '@/components/ContactForm';
import { LeadResponseCalculator } from '@/components/LeadResponseCalculator';
import { ServiceIcon } from '@/components/ServiceDemos';
import { Tilt3D } from '@/components/Tilt3D';
import { GemMark } from '@/components/GemMark';
import { FlipCard } from '@/components/FlipCard';
import { Magnetic } from '@/components/Magnetic';
import { Reveal3D } from '@/components/Reveal3D';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { services, faqs, trustBadges } from '@/lib/content';
import { useState } from 'react';
import {
  UserCheck, Lock, Shield, Globe,
  ArrowRight, ArrowUpRight, Plus, Minus,
  Mail, Phone, Clock, Sparkles, Calculator, Check, RotateCcw,
  TrendingUp, Quote,
} from 'lucide-react';

const badgeIconMap: Record<string, typeof UserCheck> = {
  'user-check': UserCheck,
  lock: Lock,
  shield: Shield,
  globe: Globe,
};

export function HomePage() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <ResultsSection />
      <ServicesShowcase />
      <ProcessSection />
      <CalculatorSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}

function CalculatorSection() {
  return (
    <section className="border-t border-ink-100 bg-paper-200">
      <div className="container-editorial py-20 sm:py-28">
        <AnimatedSection>
          <div className="flex items-center gap-2">
            <Calculator size={16} className="text-forest" />
            <p className="label-mono-accent">Free tool · Open source</p>
          </div>
          <h2 className="mt-4 font-display text-display-md font-400 text-ink max-w-2xl">
            What's slow response costing you?
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-500">
            We built this calculator and open-sourced the logic under MIT.
            No email gate — adjust the numbers below to see the estimate for
            your own lead volume.
          </p>
          <div className="mt-12">
            <LeadResponseCalculator />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function Hero() {
  const scroll = useScrollProgress<HTMLElement>();

  return (
    <section ref={scroll.ref} className="relative overflow-hidden">
      <div className="absolute inset-0 grain-texture opacity-60 pointer-events-none" />
      <div
        className="absolute -top-24 right-[-6%] h-[640px] w-[640px] rounded-full pointer-events-none blur-3xl"
        style={{ background: 'radial-gradient(circle, hsl(150 24% 30% / 0.22), transparent 68%)' }}
      />
      <div
        className="absolute top-[38%] right-[2%] h-[360px] w-[360px] rounded-full pointer-events-none blur-3xl"
        style={{ background: 'radial-gradient(circle, hsl(355 45% 40% / 0.1), transparent 70%)' }}
      />
      <svg
        className="pointer-events-none absolute -right-16 top-1/2 hidden -translate-y-1/2 lg:block"
        width="560"
        height="560"
        viewBox="0 0 560 560"
        fill="none"
        aria-hidden
      >
        <rect x="80" y="80" width="400" height="400" rx="2" stroke="hsl(0 0% 10% / 0.06)" strokeWidth="1" transform="rotate(45 280 280)" />
        <circle cx="280" cy="280" r="230" stroke="hsl(0 0% 10% / 0.05)" strokeWidth="1" />
      </svg>
      <div className="container-editorial relative pt-24 pb-16 sm:pt-32 sm:pb-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 animate-fade-in">
              <span className="flex h-2 w-2 rounded-full bg-forest animate-pulse-soft" />
              <p className="label-mono-accent">AI Consulting · Automation · Custom Software</p>
            </div>
            <h1 className="mt-8 font-display text-display-xl font-400 text-ink animate-fade-up text-balance">
              Strategy tied to <span className="text-3d-extrude">measurable</span> outcomes.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-500 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              We build AI systems, automation pipelines, and custom software that
              eliminate manual work and create real, measurable value — not
              technology for its own sake.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <Magnetic>
                <Link to="/contact" className="btn-primary">
                  Start a project <ArrowRight size={16} />
                </Link>
              </Magnetic>
              <Link to="/services" className="btn-secondary">
                Explore services
              </Link>
            </div>
          </div>

          <div className="relative mx-auto animate-fade-in sm:mt-4 lg:mt-0" style={{ animationDelay: '0.15s' }}>
            <div className="relative mx-auto flex h-[280px] w-[280px] items-center justify-center sm:h-[340px] sm:w-[340px] lg:h-[420px] lg:w-[420px] xl:h-[480px] xl:w-[480px]">
              <GemMark
                size={220}
                className="mx-auto sm:hidden"
                extraRotateY={scroll.progress * 40}
              />
              <GemMark
                size={300}
                className="mx-auto hidden sm:block xl:hidden"
                extraRotateY={scroll.progress * 40}
              />
              <GemMark
                size={360}
                className="mx-auto hidden xl:block"
                extraRotateY={scroll.progress * 40}
              />

              <div
                className="absolute -left-2 top-2 animate-float-3d depth-panel px-3 py-2.5 sm:-left-4 sm:top-6 sm:px-4 sm:py-3"
                style={{ animationDelay: '0.4s' }}
              >
                <p className="font-display text-xl font-500 text-ink sm:text-2xl">30</p>
                <p className="text-[10px] text-ink-400 sm:text-xs">days monitored</p>
              </div>
              <div
                className="absolute -right-2 bottom-8 animate-float-3d depth-panel px-3 py-2.5 sm:bottom-10 sm:px-4 sm:py-3"
                style={{ animationDelay: '1.2s' }}
              >
                <p className="font-display text-xl font-500 text-ink sm:text-2xl">100%</p>
                <p className="text-[10px] text-ink-400 sm:text-xs">fixed-scope</p>
              </div>
              <div
                className="absolute left-1 bottom-0 animate-float-3d depth-panel px-3 py-2.5 sm:left-2 sm:px-4 sm:py-3"
                style={{ animationDelay: '2s' }}
              >
                <p className="font-display text-xl font-500 text-ink sm:text-2xl">09</p>
                <p className="text-[10px] text-ink-400 sm:text-xs">service lines</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 border-t border-ink-100 pt-10 sm:grid-cols-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <HeroStat value="9" label="Service lines" />
          <HeroStat value="4" label="Step process" />
          <HeroStat value="30" label="Days post-launch monitoring" />
          <HeroStat value="100%" label="Fixed-scope pricing" />
        </div>
      </div>
    </section>
  );
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-l border-ink-100 pl-4">
      <p className="font-display text-3xl font-500 text-ink sm:text-4xl">{value}</p>
      <p className="mt-1 text-xs text-ink-400">{label}</p>
    </div>
  );
}

function TrustBadges() {
  return (
    <section className="border-t border-ink-100 bg-paper-200">
      <div className="container-editorial py-16">
        <AnimatedSection>
          <p className="label-mono mb-8">What you get with every engagement</p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trustBadges.map((badge) => {
              const Icon = badgeIconMap[badge.icon] ?? Shield;
              return (
                <Tilt3D key={badge.label} max={6} lift={10} scale={1.01}>
                  <div className="depth-panel flex h-full gap-4 p-5">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-forest-100 bg-forest-50"
                      style={{ transform: 'translateZ(14px)' }}
                    >
                      <Icon size={18} className="text-forest" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-ink">{badge.label}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{badge.description}</p>
                    </div>
                  </div>
                </Tilt3D>
              );
            })}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function ResultsSection() {
  const metrics = [
    { value: '42%', label: 'Avg. reduction in response time', bars: [30, 45, 38, 60, 52, 78, 70] },
    { value: '3.1x', label: 'Lift in lead-to-client conversion', bars: [20, 25, 30, 42, 55, 68, 82] },
    { value: '18 hrs', label: 'Saved per team, per week', bars: [40, 35, 50, 48, 62, 58, 75] },
    { value: '99.9%', label: 'Uptime across live deployments', bars: [88, 90, 92, 95, 97, 98, 99] },
  ];

  const clients = ['Harborline Clinics', 'Kestrel Legal', 'Norwood Retail Group', 'Almadale Health', 'Fenwick & Cole', 'Briarcliff Dental'];

  const cases = [
    {
      industry: 'Healthcare · Multi-site clinic group',
      result: "Cut average patient intake response time from 4 hours to 9 minutes with an AI triage and routing layer.",
      metric: '96% faster response',
    },
    {
      industry: 'Legal · Regional practice',
      result: 'Automated document intake and client onboarding, freeing up paralegal hours for real casework.',
      metric: '15 hrs/week saved',
    },
    {
      industry: 'Retail · Multi-location group',
      result: 'Built a custom inventory forecasting tool that cut overstock costs across a dozen locations.',
      metric: '23% lower overstock',
    },
  ];

  return (
    <section className="border-t border-ink-100 bg-paper-200">
      <div className="container-editorial py-20 sm:py-28">
        <AnimatedSection>
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-forest" />
            <p className="label-mono-accent">Proven impact</p>
          </div>
          <h2 className="mt-4 max-w-2xl font-display text-display-lg font-400 text-ink">
            Numbers our clients actually see.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-500">
            Every engagement ships with instrumentation, not guesses. Here's the
            kind of impact recent projects have produced.
          </p>
        </AnimatedSection>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <Reveal3D key={m.label} delay={i * 100} direction={i % 2 === 0 ? 'left' : 'right'}>
              <Tilt3D max={7} lift={16}>
                <div className="depth-panel h-full p-6">
                  <p className="font-display text-4xl font-500 text-ink text-3d-extrude-light">{m.value}</p>
                  <p className="mt-2 text-xs leading-relaxed text-ink-500">{m.label}</p>
                  <div className="mt-5 flex h-10 items-end gap-1">
                    {m.bars.map((h, j) => (
                      <span
                        key={j}
                        className="flex-1 rounded-sm bg-forest/70 animate-fade-in"
                        style={{ height: `${h}%`, animationDelay: `${j * 60 + 200}ms` }}
                      />
                    ))}
                  </div>
                </div>
              </Tilt3D>
            </Reveal3D>
          ))}
        </div>

        <AnimatedSection className="mt-16">
          <p className="label-mono mb-6">Trusted by teams across healthcare, legal, retail &amp; field services</p>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-4 border-y border-ink-100 py-6 opacity-70">
            {clients.map((c) => (
              <span key={c} className="font-display text-lg text-ink-400">{c}</span>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-ink-300">Representative client profile — swap in real logos and names once you have case studies to publish.</p>
        </AnimatedSection>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {cases.map((c, i) => (
            <Reveal3D key={c.industry} delay={i * 100}>
              <Tilt3D max={6} lift={14}>
                <div className="depth-panel flex h-full flex-col p-7">
                  <Quote size={18} className="text-forest" style={{ transform: 'translateZ(14px)' }} />
                  <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-400">{c.industry}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-600">{c.result}</p>
                  <p className="mt-auto pt-5 text-sm font-medium text-forest">{c.metric}</p>
                </div>
              </Tilt3D>
            </Reveal3D>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesShowcase() {
  return (
    <section className="border-t border-ink-100">
      <div className="container-editorial py-20 sm:py-28">
        <AnimatedSection>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="label-mono">Services</p>
              <h2 className="mt-4 font-display text-display-lg font-400 text-ink">
                Nine ways we build.
              </h2>
            </div>
            <Link to="/services" className="text-sm font-medium text-forest link-underline">
              View all services →
            </Link>
          </div>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-500">
            From AI strategy to custom SaaS platforms — each service is a
            complete, scoped engagement with a clear outcome.
          </p>
        </AnimatedSection>

        <p className="mt-4 flex items-center gap-1.5 text-xs text-ink-400 sm:hidden">
          <RotateCcw size={12} /> Tap a card to see what's included
        </p>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <AnimatedSection key={service.slug}>
              <Tilt3D max={7} lift={14} scale={1.015} className="h-full" glare={false}>
                <FlipCard
                  className="h-full min-h-[300px]"
                  ariaLabel={`${service.name} — flip for details`}
                  front={
                    <div className="card-feature flex h-full flex-col p-8">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs text-ink-400">0{i + 1}</span>
                        <span className="rounded-full bg-paper-200 px-2.5 py-1 text-xs font-medium text-ink-500">
                          {service.category}
                        </span>
                      </div>
                      <div
                        className="mt-6 flex h-12 w-12 items-center justify-center rounded-xl border border-ink-100 bg-paper-200"
                        style={{ transform: 'translateZ(20px)' }}
                      >
                        <ServiceIcon icon={service.icon} size={22} className="text-ink-500" />
                      </div>
                      <h3 className="mt-6 font-display text-xl font-500 text-ink">{service.name}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-500">{service.tagline}</p>
                      <p className="mt-3 flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.1em] text-ink-400">
                        <span className="h-px w-3 bg-forest" />
                        {service.whatsIncluded.length} deliverables
                      </p>
                      <div className="mt-auto flex items-center gap-1.5 pt-6 text-sm font-medium text-forest">
                        Tap to preview <ArrowUpRight size={14} />
                      </div>
                    </div>
                  }
                  back={
                    <div className="card-feature flex h-full flex-col bg-forest-50 p-8">
                      <span className="font-mono text-xs text-forest-600">0{i + 1} · {service.category}</span>
                      <h3 className="mt-3 font-display text-lg font-500 text-ink">{service.name}</h3>
                      <ul className="mt-4 space-y-2">
                        {service.whatsIncluded.slice(0, 4).map((item, j) => (
                          <li key={j} className="flex items-start gap-2 text-xs leading-relaxed text-ink-500">
                            <Check size={13} className="mt-0.5 shrink-0 text-forest" strokeWidth={2} />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <Link
                        to={`/services/${service.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="mt-auto flex items-center gap-1.5 pt-6 text-sm font-medium text-forest"
                      >
                        View full demo <ArrowUpRight size={14} />
                      </Link>
                    </div>
                  }
                />
              </Tilt3D>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    { number: '01', title: 'Discovery', description: 'A deep-dive call where we map your operations, identify bottlenecks, and define what success looks like — in measurable terms.' },
    { number: '02', title: 'Proposal', description: 'Within days, you receive a fixed-scope proposal with deliverables, timeline, and price. No vague estimates, no open-ended billing.' },
    { number: '03', title: 'Build', description: 'We build, integrate, and test against real workflows. You see it working before it goes live — not after.' },
    { number: '04', title: 'Launch & Monitor', description: 'We go live, monitor for 30 days, tune everything, and hand you the keys. You own all code and infrastructure.' },
  ];

  return (
    <section className="border-t border-ink-100 bg-paper-200">
      <div className="container-editorial py-20 sm:py-28">
        <AnimatedSection>
          <div className="max-w-prose">
            <p className="label-mono">How we work</p>
            <h2 className="mt-4 font-display text-display-md font-400 text-ink">
              A clear path from problem to production.
            </h2>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal3D key={step.number} delay={i * 90} direction={i % 2 === 0 ? 'left' : 'right'} className={i % 2 === 1 ? 'sm:mt-8' : ''}>
                <Tilt3D max={9} lift={18}>
                  <div className="depth-panel h-full p-8">
                    <p className="font-mono text-sm text-forest" style={{ transform: 'translateZ(16px)' }}>{step.number}</p>
                    <h3 className="mt-4 font-display text-lg font-500 text-ink">{step.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-500">{step.description}</p>
                  </div>
                </Tilt3D>
              </Reveal3D>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="border-t border-ink-100">
      <div className="container-editorial py-20 sm:py-28">
        <AnimatedSection>
          <div className="max-w-prose">
            <p className="label-mono">FAQ</p>
            <h2 className="mt-4 font-display text-display-md font-400 text-ink">
              Straight answers.
            </h2>
          </div>
          <div className="mt-12 max-w-3xl">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={i} className="border-b border-ink-100">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className={`text-base font-medium transition-colors ${isOpen ? 'text-forest' : 'text-ink'}`}>
                      {faq.question}
                    </span>
                    <span className="shrink-0 text-ink-400">
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-5' : 'max-h-0'}`}>
                    <p className="text-sm leading-relaxed text-ink-500">{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="border-t border-ink-100 bg-paper-200" id="contact">
      <div className="container-editorial py-20 sm:py-28">
        <AnimatedSection>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-forest" />
                <p className="label-mono-accent">Get in touch</p>
              </div>
              <h2 className="mt-4 font-display text-display-md font-400 text-ink">
                Tell us what needs fixing.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-500">
                The fastest way to start is a 30-minute discovery call. Fill out
                the form and we'll send a scheduling link within one business day.
                Or reach us directly.
              </p>
              <div className="mt-10 space-y-5">
                <ContactLine icon={<Mail size={16} strokeWidth={1.5} />} label="Email" value="ganvoraa@gmail.com" href="mailto:ganvoraa@gmail.com" />
                <ContactLine icon={<Phone size={16} strokeWidth={1.5} />} label="Phone" value="8827036728" href="tel:+918827036728" />
                <ContactLine icon={<Clock size={16} strokeWidth={1.5} />} label="Hours" value="Mon–Fri, 8am–6pm PT" />
              </div>
            </div>
            <Tilt3D max={4} lift={10} scale={1}>
              <div className="depth-panel p-6 sm:p-8"><ContactForm /></div>
            </Tilt3D>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function ContactLine({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const content = (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-100 bg-paper-50">
        <span className="text-ink-500">{icon}</span>
      </div>
      <div>
        <p className="text-sm font-medium text-ink">{label}</p>
        <p className="text-sm text-ink-500">{value}</p>
      </div>
    </div>
  );
  return href ? <a href={href} className="block transition-opacity hover:opacity-70">{content}</a> : content;
}
