import { AnimatedSection } from '@/components/AnimatedSection';
import { ContactForm } from '@/components/ContactForm';
import { Tilt3D } from '@/components/Tilt3D';
import { Mail, Phone, Clock, MapPin, Sparkles } from 'lucide-react';

export function ContactPage() {
  return (
    <section className="container-editorial pt-24 pb-32 sm:pt-32">
      <AnimatedSection>
        <div className="max-w-2xl">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-forest" />
            <p className="label-mono-accent">Contact</p>
          </div>
          <span className="mt-2 block h-px w-8 bg-forest" />
          <h1 className="mt-6 font-display text-display-xl font-400 text-ink text-balance">
            Tell us what needs fixing.
          </h1>
          <p className="mt-8 text-lg leading-relaxed text-ink-500">
            The fastest way to start is a 30-minute discovery call. Fill out the
            form below and we'll send a scheduling link within one business day.
            Or reach us directly.
          </p>
        </div>
      </AnimatedSection>

      <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
        <AnimatedSection>
          <div className="space-y-8">
            <ContactInfo index="01" icon={<Mail size={18} strokeWidth={1.5} />} label="Email" value="ganvoraa@gmail.com" href="mailto:ganvoraa@gmail.com" />
            <ContactInfo index="02" icon={<Phone size={18} strokeWidth={1.5} />} label="Phone" value="8827036728" href="tel:+918827036728" />
            <ContactInfo index="03" icon={<Clock size={18} strokeWidth={1.5} />} label="Hours" value="Mon–Fri, 8am–6pm PT" />
            <ContactInfo index="04" icon={<MapPin size={18} strokeWidth={1.5} />} label="Location" value="Bangalore India" />
          </div>
          <Tilt3D max={5} lift={10} scale={1}>
            <div className="mt-10 rounded-xl border border-forest-100 bg-forest-50 p-6">
              <p className="flex items-center gap-2 text-sm font-medium text-forest-600">
                <span className="h-1.5 w-1.5 rounded-full bg-forest animate-pulse-soft" />
                Current availability
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">
                Taking on new engagements this quarter. Limited slots.
              </p>
            </div>
          </Tilt3D>
        </AnimatedSection>

        <AnimatedSection>
          <Tilt3D max={3} lift={8} scale={1}>
            <div className="depth-panel p-6 sm:p-8">
              <ContactForm />
            </div>
          </Tilt3D>
        </AnimatedSection>
      </div>
    </section>
  );
}

function ContactInfo({ index, icon, label, value, href }: { index: string; icon: React.ReactNode; label: string; value: string; href?: string }) {
  const content = (
    <div className="flex items-start gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink-100 bg-paper-50 transition-colors group-hover:border-forest-100 group-hover:bg-forest-50">
        <span className="text-ink-500 transition-colors group-hover:text-forest">{icon}</span>
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-ink">{label}</p>
          <span className="font-mono text-xs text-ink-300">{index}</span>
        </div>
        <p className="mt-1 text-sm text-ink-500">{value}</p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="group block transition-opacity hover:opacity-80">{content}</a>
  ) : (
    <div className="group">{content}</div>
  );
}
