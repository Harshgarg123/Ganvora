import { Link } from '@/lib/router';
import { AnimatedSection } from '@/components/AnimatedSection';
import { Tilt3D } from '@/components/Tilt3D';
import { Linkedin, Github, Mail, ArrowRight, MapPin, Compass, Zap, Users } from 'lucide-react';

export function AboutPage() {
  return (
    <>
      <section className="container-editorial pt-24 pb-16 sm:pt-32">
        <div className="max-w-2xl">
          <p className="label-mono">About</p>
          <span className="mt-2 block h-px w-8 bg-forest" />
          <h1 className="mt-6 font-display text-display-xl font-400 text-ink text-balance">
            We build systems that do the work, so your team doesn't have to.
          </h1>
        </div>
      </section>

      <section className="container-editorial pb-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <div>
            {/* <Tilt3D max={6} lift={10} scale={1.01}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-ink-100 bg-paper-200">
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-90"
                  style={{ transform: 'translateZ(30px)' }}
                >
                  <GemMark size={200} spinSpeed={0.01} />
                </div>
                <div className="absolute inset-6 flex flex-col justify-between">
                  <span className="font-mono text-xs uppercase tracking-[0.15em] text-ink-400">Founder</span>
                  <span />
                  <div className="border-t border-forest-100 pt-3">
                    <p className="text-xs text-ink-400">Portrait to be added</p>
                  </div>
                </div>
              </div>
            </Tilt3D> */}
            <p className="mt-3 flex items-center gap-1.5 text-xs text-ink-400">
              <span className="h-px w-3 bg-forest" /> Photo coming soon
            </p>
          </div>

          <div className="max-w-prose">
            <AnimatedSection>
              <div className="space-y-6 text-base leading-relaxed text-ink-500">
                <p>
                  GANVORA is an AI consulting and engineering studio. We work
                  with companies across industries — healthcare, real estate,
                  finance, e-commerce, logistics — to build automation systems,
                  AI agents, and custom software that eliminate manual work and
                  create measurable value.
                </p>
                <p>
                  We started GANVORA after years of watching businesses struggle
                  with the same problem: they knew AI and automation could help,
                  but every vendor either wanted to sell them a $50,000 enterprise
                  platform or a $99/month SaaS tool that didn't integrate with
                  anything. There was nobody in the middle — nobody who would
                  build a custom system that fit their actual workflow.
                </p>
                <p>
                  That's the gap we fill. Custom systems, built around your
                  operations, scoped and priced before we start. No retainers
                  required. No lock-in. You own everything we build.
                </p>
                <p>
                  We take on a limited number of engagements at a time. This
                  isn't a marketing tactic — it's the only way we can guarantee
                  the quality of work we're willing to put our name on.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="border-t border-ink-100 bg-paper-200">
        <div className="container-editorial py-20">
          <AnimatedSection>
            <div className="max-w-prose">
              <p className="label-mono">Principles</p>
              <span className="mt-2 block h-px w-8 bg-forest" />
              <h2 className="mt-4 font-display text-display-md font-400 text-ink">
                What we believe.
              </h2>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
              <Principle
                index="01"
                icon={<Compass size={22} strokeWidth={1.5} />}
                title="Outcomes over technology"
                description="We don't sell AI for its own sake. Every recommendation ties to a measurable outcome — revenue, time saved, error rate reduced."
              />
              <Principle
                index="02"
                icon={<Zap size={22} strokeWidth={1.5} />}
                title="Build, don't configure"
                description="We write code. We don't duct-tape SaaS tools together. When your process is your advantage, your software should reflect it."
              />
              <Principle
                index="03"
                icon={<Users size={22} strokeWidth={1.5} />}
                title="You own everything"
                description="All code, documentation, and infrastructure is yours. No lock-in, no black boxes, no monthly hostage fees. You can leave at any time."
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="border-t border-ink-100">
        <div className="container-editorial py-20">
          <AnimatedSection>
            <p className="label-mono">Connect</p>
            <span className="mt-2 block h-px w-8 bg-forest" />
            <h2 className="mt-4 font-display text-display-md font-400 text-ink">
              Let's talk.
            </h2>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link to="/contact" className="btn-primary">
                Start a project <ArrowRight size={16} />
              </Link>
              <div className="flex items-center gap-6">
                <a href="mailto:ganvoraa@gmail.com" className="link-underline flex items-center gap-2 text-sm text-ink-500 hover:text-forest transition-colors">
                  <Mail size={16} /> ganvoraa@gmail.com
                </a>
                <a href="https://www.linkedin.com/company/ganvora" target="_blank" rel="noopener noreferrer" className="link-underline flex items-center gap-2 text-sm text-ink-500 hover:text-forest transition-colors">
                  <Linkedin size={16} /> LinkedIn
                </a>
                <a href="https://github.com/Harshgarg123" target="_blank" rel="noopener noreferrer" className="link-underline flex items-center gap-2 text-sm text-ink-500 hover:text-forest transition-colors">
                  <Github size={16} /> GitHub
                </a>
              </div>
            </div>
            <p className="mt-6 flex items-center gap-2 text-sm text-ink-400">
              <MapPin size={15} /> Bangalore India 
            </p>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}

function Principle({ index, icon, title, description }: { index: string; icon: React.ReactNode; title: string; description: string }) {
  return (
    <Tilt3D max={7} lift={12}>
      <div className="group depth-panel h-full p-6">
        <div className="flex items-center justify-between">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-forest-100 bg-forest-50 text-forest transition-transform duration-300 group-hover:-translate-y-0.5"
            style={{ transform: 'translateZ(18px)' }}
          >
            {icon}
          </div>
          <span className="font-mono text-xs text-ink-300">{index}</span>
        </div>
        <h3 className="mt-5 font-display text-lg font-500 text-ink">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-500">{description}</p>
      </div>
    </Tilt3D>
  );
}
