import { useState, useMemo, useEffect, useRef } from 'react';
import {
  Calculator,
  TrendingUp,
  ArrowRight,
  Check,
  Bot,
  Phone,
  PhoneCall,
  Workflow,
  Users,
  Code,
  Globe,
  Layers,
  Repeat,
  Compass,
  Play,
  Pause,
  Mail,
  Calendar,
  FileText,
  Database,
  Zap,
  Activity,
} from 'lucide-react';

const iconMap: Record<string, typeof Bot> = {
  compass: Compass,
  workflow: Workflow,
  bot: Bot,
  'phone-call': PhoneCall,
  repeat: Repeat,
  users: Users,
  code: Code,
  globe: Globe,
  layers: Layers,
};

export function ServiceIcon({ icon, size = 24, className = '' }: { icon: string; size?: number; className?: string }) {
  const Icon = iconMap[icon] ?? Bot;
  return <Icon size={size} className={className} strokeWidth={1.5} />;
}

// ─── AI Consulting: ROI Calculator ───────────────────────────────
export function RoiCalculatorDemo() {
  const [processes, setProcesses] = useState(12);
  const [hoursPerWeek, setHoursPerWeek] = useState(8);
  const [hourlyRate, setHourlyRate] = useState(75);

  const result = useMemo(() => {
    const totalWeeklyHours = processes * hoursPerWeek;
    const weeklyCost = totalWeeklyHours * hourlyRate;
    const monthlyCost = weeklyCost * 4.33;
    const yearlyCost = monthlyCost * 12;
    const automationSavings = yearlyCost * 0.75;
    const paybackWeeks = Math.ceil(15000 / (weeklyCost * 0.75 * 4.33));
    return { totalWeeklyHours, monthlyCost, yearlyCost, automationSavings, paybackWeeks };
  }, [processes, hoursPerWeek, hourlyRate]);

  const fmt = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div className="rounded-2xl border border-ink-100 bg-paper-50 p-6 sm:p-8">
      <div className="flex items-center gap-2.5">
        <Calculator size={20} className="text-forest" strokeWidth={1.5} />
        <h3 className="font-display text-lg font-500 text-ink">ROI Projection Calculator</h3>
      </div>
      <p className="mt-2 text-sm text-ink-500">Adjust the sliders to see where AI creates measurable value.</p>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-5">
          <Slider label="Manual processes" value={processes} min={1} max={50} step={1} suffix=" processes" onChange={setProcesses} />
          <Slider label="Hours per process / week" value={hoursPerWeek} min={1} max={40} step={1} suffix=" hrs" onChange={setHoursPerWeek} />
          <Slider label="Avg. hourly cost" value={hourlyRate} min={25} max={300} step={5} prefix="$" onChange={setHourlyRate} />
        </div>
        <div className="flex flex-col justify-between gap-4 rounded-xl bg-forest-50 p-5">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-forest" />
              <p className="label-mono !text-forest-600">Yearly savings</p>
            </div>
            <p className="mt-2 font-display text-3xl font-500 text-ink">{fmt(result.automationSavings)}</p>
            <p className="mt-1 text-sm text-ink-500">From {fmt(result.yearlyCost)} in manual labor</p>
          </div>
          <div className="space-y-2 border-t border-forest-100 pt-3">
            <Row label="Hours saved / week" value={`${result.totalWeeklyHours * 0.75 | 0} hrs`} />
            <Row label="Monthly savings" value={fmt(result.monthlyCost * 0.75)} />
            <Row label="Est. payback" value={`${result.paybackWeeks} weeks`} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Automation Systems: Workflow Builder ───────────────────────
export function WorkflowBuilderDemo() {
  const [activeStep, setActiveStep] = useState(0);
  const [running, setRunning] = useState(false);

  const steps = [
    { icon: Mail, label: 'New email received', detail: 'Trigger: support@company.com' },
    { icon: Bot, label: 'AI classifies intent', detail: 'Sales → Route to CRM' },
    { icon: Database, label: 'CRM record created', detail: 'Lead score: 82/100' },
    { icon: Calendar, label: 'Follow-up scheduled', detail: 'Auto-booked for tomorrow 10am' },
    { icon: Check, label: 'Team notified', detail: '#sales channel in Slack' },
  ];

  useEffect(() => {
    if (!running) return;
    if (activeStep >= steps.length) {
      const reset = setTimeout(() => { setActiveStep(0); setRunning(false); }, 2000);
      return () => clearTimeout(reset);
    }
    const timer = setTimeout(() => setActiveStep((s) => s + 1), 900);
    return () => clearTimeout(timer);
  }, [running, activeStep]);

  return (
    <div className="rounded-2xl border border-ink-100 bg-paper-50 p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Workflow size={20} className="text-forest" strokeWidth={1.5} />
          <h3 className="font-display text-lg font-500 text-ink">Workflow Simulation</h3>
        </div>
        <button
          onClick={() => { setRunning(!running); if (!running) setActiveStep(0); }}
          className="flex items-center gap-1.5 rounded-full bg-forest px-4 py-2 text-xs font-medium text-paper-50 transition-colors hover:bg-forest-600"
        >
          {running ? <Pause size={14} /> : <Play size={14} />}
          {running ? 'Running' : 'Run workflow'}
        </button>
      </div>
      <p className="mt-2 text-sm text-ink-500">Watch how a single trigger cascades through connected systems.</p>

      <div className="mt-6 space-y-2">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const done = activeStep > i;
          const active = activeStep === i && running;
          return (
            <div
              key={i}
              className={`flex items-center gap-4 rounded-xl border p-4 transition-all duration-500 ${
                done ? 'border-forest-100 bg-forest-50' : active ? 'border-forest bg-paper-100 shadow-premium' : 'border-ink-100 bg-paper-100'
              }`}
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                done ? 'bg-forest text-paper-50' : active ? 'bg-forest text-paper-50 animate-pulse-soft' : 'bg-paper-300 text-ink-400'
              }`}>
                <Icon size={18} strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium transition-colors ${done || active ? 'text-ink' : 'text-ink-400'}`}>
                  {step.label}
                </p>
                <p className="text-xs text-ink-400 mt-0.5">{step.detail}</p>
              </div>
              {done && <Check size={16} className="text-forest" />}
              {active && <Activity size={16} className="text-forest animate-pulse-soft" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── AI Agents: Agent Chat ───────────────────────────────────────
export function AgentChatDemo() {
  const [messages, setMessages] = useState<{ role: 'user' | 'agent'; text: string }[]>([
    { role: 'agent', text: 'Hello. I\u2019m your AI research agent. Ask me to research a company, qualify a lead, or schedule a meeting.' },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    'Research Acme Corp for a sales call',
    'Qualify this lead: startup, 50 employees, Series A',
    'Schedule a meeting with the team',
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: 'user', text }]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const responses: Record<string, string> = {
        research: 'Researching Acme Corp...\n\n• Industry: B2B SaaS, project management tools\n• Funding: Series B, $40M raised (2024)\n• Team: ~120 employees, growing\n• Tech stack: React, Node.js, AWS\n• Recent news: Launched AI feature suite last month\n\nRecommendation: Lead with integration capabilities. They\u2019re in build mode.',
        qualify: 'Qualifying lead...\n\n• Score: 87/100 — High priority\n• Budget: Likely $50K+ (Series A funding)\n• Authority: Connect with VP Engineering\n• Need: High — scaling fast, manual processes\n• Timeline: 1\u20133 months\n\nAction: Route to senior account exec. Book call this week.',
        schedule: 'Scheduling meeting...\n\n• Checked team calendars: 3 available slots\n• Proposed: Thu 2pm, Fri 10am, Mon 3pm\n• Sent calendar invites to all participants\n• Booked conference room (if in-person)\n• Created meeting agenda doc\n\nDone. You\u2019ll get confirmations shortly.',
      };
      const key = Object.keys(responses).find((k) => text.toLowerCase().includes(k));
      const response = responses[key ?? ''] || 'I can research companies, qualify leads, schedule meetings, enrich data, and handle outreach. Try one of the suggested prompts above.';
      setMessages((m) => [...m, { role: 'agent', text: response }]);
      setTyping(false);
    }, 1400);
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  return (
    <div className="rounded-2xl border border-ink-100 bg-paper-50 p-6 sm:p-8">
      <div className="flex items-center gap-2.5">
        <Bot size={20} className="text-forest" strokeWidth={1.5} />
        <h3 className="font-display text-lg font-500 text-ink">Agent Interaction</h3>
      </div>
      <p className="mt-2 text-sm text-ink-500">Try asking the agent to do something — it takes action, not just answers.</p>

      <div ref={scrollRef} className="mt-6 h-72 space-y-3 overflow-y-auto rounded-xl border border-ink-100 bg-paper-100 p-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm ${
              m.role === 'user' ? 'bg-forest text-paper-50' : 'bg-paper-50 border border-ink-100 text-ink-500'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="flex gap-1.5 rounded-2xl border border-ink-100 bg-paper-50 px-4 py-3">
              <span className="h-2 w-2 rounded-full bg-ink-300 animate-pulse-soft" />
              <span className="h-2 w-2 rounded-full bg-ink-300 animate-pulse-soft" style={{ animationDelay: '0.2s' }} />
              <span className="h-2 w-2 rounded-full bg-ink-300 animate-pulse-soft" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => handleSend(s)}
            className="rounded-full border border-ink-200 bg-paper-100 px-3 py-1.5 text-xs text-ink-500 transition-colors hover:border-forest-200 hover:text-forest"
          >
            {s}
          </button>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
          placeholder="Ask the agent to do something..."
          className="input-premium flex-1"
        />
        <button onClick={() => handleSend(input)} className="btn-primary !px-4">
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

// ─── Voice AI: Voice Simulator ───────────────────────────────────
export function VoiceSimulatorDemo() {
  const [callActive, setCallActive] = useState(false);
  const [transcript, setTranscript] = useState<{ speaker: 'caller' | 'agent'; text: string }[]>([]);
  const [step, setStep] = useState(0);

  const conversation = [
    { speaker: 'caller' as const, text: 'Hi, I\u2019m calling about scheduling a consultation.' },
    { speaker: 'agent' as const, text: 'Of course. I can help with that. Could I get your name and what you\u2019re looking to discuss?' },
    { speaker: 'caller' as const, text: 'Sarah Johnson. We need help automating our invoicing process.' },
    { speaker: 'agent' as const, text: 'Got it, Sarah. I see we have openings Thursday at 2pm or Friday at 10am. Which works better?' },
    { speaker: 'caller' as const, text: 'Thursday at 2pm works.' },
    { speaker: 'agent' as const, text: 'Booked. I\u2019ve sent a calendar invite to your email and created a summary for our team. You\u2019ll get a reminder the day before. Anything else I can help with?' },
  ];

  useEffect(() => {
    if (!callActive) return;
    if (step >= conversation.length) {
      const done = setTimeout(() => { setCallActive(false); }, 2000);
      return () => clearTimeout(done);
    }
    const timer = setTimeout(() => {
      setTranscript((t) => [...t, conversation[step]]);
      setStep((s) => s + 1);
    }, step === 0 ? 500 : 1200);
    return () => clearTimeout(timer);
  }, [callActive, step]);

  const startCall = () => {
    setTranscript([]);
    setStep(0);
    setCallActive(true);
  };

  return (
    <div className="rounded-2xl border border-ink-100 bg-paper-50 p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <PhoneCall size={20} className="text-forest" strokeWidth={1.5} />
          <h3 className="font-display text-lg font-500 text-ink">Voice Agent Demo</h3>
        </div>
        <div className={`flex items-center gap-2 text-xs font-medium ${callActive ? 'text-forest' : 'text-ink-400'}`}>
          <span className={`h-2 w-2 rounded-full ${callActive ? 'bg-forest animate-pulse-soft' : 'bg-ink-300'}`} />
          {callActive ? 'On call' : 'Idle'}
        </div>
      </div>
      <p className="mt-2 text-sm text-ink-500">Listen in on a simulated call — the agent handles intake, scheduling, and follow-up.</p>

      <div className="mt-6 rounded-xl border border-ink-100 bg-paper-100 p-4">
        <div className="flex items-center justify-center py-6">
          <button
            onClick={startCall}
            disabled={callActive}
            className={`flex h-16 w-16 items-center justify-center rounded-full transition-all duration-300 ${
              callActive ? 'bg-forest-100 cursor-default' : 'bg-forest text-paper-50 hover:scale-110 hover:shadow-forest'
            }`}
          >
            <Phone size={24} strokeWidth={1.5} />
          </button>
        </div>
        <div className="min-h-[180px] space-y-3">
          {transcript.length === 0 && !callActive && (
            <p className="text-center text-sm text-ink-400 py-8">Press call to start the simulation</p>
          )}
          {transcript.map((m, i) => (
            <div key={i} className={`flex ${m.speaker === 'caller' ? 'justify-end' : 'justify-start'} animate-slide-in`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                m.speaker === 'caller' ? 'bg-paper-300 text-ink' : 'bg-forest text-paper-50'
              }`}>
                <span className="block text-xs opacity-60 mb-0.5">{m.speaker === 'caller' ? 'Caller' : 'AI Agent'}</span>
                {m.text}
              </div>
            </div>
          ))}
          {callActive && step < conversation.length && (
            <div className="flex justify-start">
              <div className="flex gap-1.5 rounded-2xl bg-forest px-4 py-3">
                <span className="h-2 w-2 rounded-full bg-paper-50/60 animate-pulse-soft" />
                <span className="h-2 w-2 rounded-full bg-paper-50/60 animate-pulse-soft" style={{ animationDelay: '0.2s' }} />
                <span className="h-2 w-2 rounded-full bg-paper-50/60 animate-pulse-soft" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Business Automation: Task Automator ─────────────────────────
export function TaskAutomatorDemo() {
  const [tasks, setTasks] = useState([
    { label: 'Generate weekly invoice batch', icon: FileText, automated: true, schedule: 'Every Friday 5pm' },
    { label: 'Send client follow-up reminders', icon: Mail, automated: true, schedule: '3 days after delivery' },
    { label: 'Sync inventory to dashboard', icon: Database, automated: true, schedule: 'Every 2 hours' },
    { label: 'Compile monthly performance report', icon: Activity, automated: false, schedule: 'Manual — 4 hrs/month' },
  ]);

  const toggle = (i: number) => {
    setTasks((t) => t.map((task, idx) =>
      idx === i
        ? { ...task, automated: !task.automated, schedule: !task.automated ? 'Automated' : 'Manual — 4 hrs/month' }
        : task
    ));
  };

  const automatedCount = tasks.filter((t) => t.automated).length;
  const hoursSaved = automatedCount * 12;

  return (
    <div className="rounded-2xl border border-ink-100 bg-paper-50 p-6 sm:p-8">
      <div className="flex items-center gap-2.5">
        <Repeat size={20} className="text-forest" strokeWidth={1.5} />
        <h3 className="font-display text-lg font-500 text-ink">Task Automation Toggle</h3>
      </div>
      <p className="mt-2 text-sm text-ink-500">Toggle tasks on to see how much time automation reclaims.</p>

      <div className="mt-4 flex items-center justify-between rounded-xl bg-forest-50 px-5 py-3">
        <span className="text-sm text-ink-500">Hours saved per month</span>
        <span className="font-display text-2xl font-500 text-forest">{hoursSaved} hrs</span>
      </div>

      <div className="mt-5 space-y-2">
        {tasks.map((task, i) => {
          const Icon = task.icon;
          return (
            <div key={i} className="flex items-center gap-4 rounded-xl border border-ink-100 bg-paper-100 p-4 transition-colors hover:border-ink-200">
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${task.automated ? 'bg-forest-50 text-forest' : 'bg-paper-300 text-ink-400'}`}>
                <Icon size={16} strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-ink">{task.label}</p>
                <p className="text-xs text-ink-400 mt-0.5">{task.schedule}</p>
              </div>
              <button
                onClick={() => toggle(i)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${task.automated ? 'bg-forest' : 'bg-ink-200'}`}
                aria-label="Toggle automation"
              >
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-paper-50 shadow-sm transition-transform ${task.automated ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── CRM Systems: Pipeline Visualizer ────────────────────────────
export function CrmPipelineDemo() {
  const stages = [
    { name: 'New Lead', count: 24, value: '$48k', color: 'bg-ink-200' },
    { name: 'Qualified', count: 12, value: '$36k', color: 'bg-forest-200' },
    { name: 'Proposal', count: 6, value: '$54k', color: 'bg-forest-300' },
    { name: 'Closed', count: 3, value: '$42k', color: 'bg-forest' },
  ];

  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActiveStage((s) => (s + 1) % stages.length), 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="rounded-2xl border border-ink-100 bg-paper-50 p-6 sm:p-8">
      <div className="flex items-center gap-2.5">
        <Users size={20} className="text-forest" strokeWidth={1.5} />
        <h3 className="font-display text-lg font-500 text-ink">Pipeline Visualization</h3>
      </div>
      <p className="mt-2 text-sm text-ink-500">Automated pipeline with real-time lead scoring and routing.</p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stages.map((stage, i) => (
          <div
            key={i}
            className={`rounded-xl border p-4 transition-all duration-500 ${
              activeStage === i ? 'border-forest bg-forest-50 shadow-premium scale-105' : 'border-ink-100 bg-paper-100'
            }`}
          >
            <div className={`mb-3 h-1.5 w-full rounded-full ${stage.color}`} />
            <p className="text-xs text-ink-400">{stage.name}</p>
            <p className="mt-1 font-display text-2xl font-500 text-ink">{stage.count}</p>
            <p className="text-xs text-ink-500 mt-1">{stage.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-ink-100 bg-paper-100 p-4">
        <div className="flex items-center gap-2">
          <Zap size={14} className="text-forest" />
          <p className="text-xs font-medium text-ink">Automated actions in the last 24 hours</p>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-3 text-center">
          <div><p className="font-display text-xl font-500 text-forest">47</p><p className="text-xs text-ink-400">Follow-ups sent</p></div>
          <div><p className="font-display text-xl font-500 text-forest">12</p><p className="text-xs text-ink-400">Leads scored</p></div>
          <div><p className="font-display text-xl font-500 text-forest">8</p><p className="text-xs text-ink-400">Meetings booked</p></div>
        </div>
      </div>
    </div>
  );
}

// ─── Custom Software: Architecture Explorer ──────────────────────
export function ArchitectureExplorerDemo() {
  const layers = [
    { name: 'Frontend', tech: 'React, TypeScript', icon: Globe, detail: 'Custom UI built around your operations' },
    { name: 'API Layer', tech: 'Node.js, REST/GraphQL', icon: Code, detail: 'Typed endpoints with auth and rate limiting' },
    { name: 'Business Logic', tech: 'Domain-driven design', icon: Workflow, detail: 'Your rules, not a framework\u2019s assumptions' },
    { name: 'Data Layer', tech: 'PostgreSQL, Redis', icon: Database, detail: 'Relational integrity with caching' },
    { name: 'Infrastructure', tech: 'Docker, CI/CD', icon: Layers, detail: 'Scalable, monitored, auto-deploying' },
  ];

  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="rounded-2xl border border-ink-100 bg-paper-50 p-6 sm:p-8">
      <div className="flex items-center gap-2.5">
        <Code size={20} className="text-forest" strokeWidth={1.5} />
        <h3 className="font-display text-lg font-500 text-ink">Architecture Blueprint</h3>
      </div>
      <p className="mt-2 text-sm text-ink-500">Hover each layer to see what goes into a custom-built system.</p>

      <div className="mt-6 space-y-2">
        {layers.map((layer, i) => {
          const Icon = layer.icon;
          const isHovered = hovered === i;
          return (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`flex items-center gap-4 rounded-xl border p-4 transition-all duration-300 ${
                isHovered ? 'border-forest bg-forest-50 shadow-premium' : 'border-ink-100 bg-paper-100'
              }`}
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors ${isHovered ? 'bg-forest text-paper-50' : 'bg-paper-300 text-ink-500'}`}>
                <Icon size={18} strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-ink">{layer.name}</p>
                <p className="text-xs text-ink-400 mt-0.5">{layer.tech}</p>
              </div>
              <p className={`text-xs text-right transition-opacity duration-300 ${isHovered ? 'text-ink-500 opacity-100' : 'text-ink-300 opacity-60'}`}>
                {layer.detail}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Web Platforms: Performance Demo ────────────────────────────
export function PerformanceDemo() {
  const [loadTime, setLoadTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    if (loadTime >= 0.8) {
      setRunning(false);
      return;
    }
    const timer = setTimeout(() => setLoadTime((t) => Math.min(t + 0.05, 0.8)), 30);
    return () => clearTimeout(timer);
  }, [running, loadTime]);

  const metrics = [
    { label: 'Load Time', value: '0.8s', target: '< 1s' },
    { label: 'Lighthouse', value: '98', target: '90+' },
    { label: 'Page Size', value: '142kb', target: '< 200kb' },
  ];

  return (
    <div className="rounded-2xl border border-ink-100 bg-paper-50 p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Globe size={20} className="text-forest" strokeWidth={1.5} />
          <h3 className="font-display text-lg font-500 text-ink">Performance Profile</h3>
        </div>
        <button
          onClick={() => { setLoadTime(0); setRunning(true); }}
          disabled={running}
          className="rounded-full bg-forest px-4 py-2 text-xs font-medium text-paper-50 transition-colors hover:bg-forest-600 disabled:opacity-50"
        >
          {running ? 'Loading...' : 'Run test'}
        </button>
      </div>
      <p className="mt-2 text-sm text-ink-500">Every platform we build ships with sub-second load times.</p>

      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-ink-400">Page load progress</span>
          <span className="font-mono text-xs text-forest">{(loadTime).toFixed(2)}s</span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-paper-300">
          <div
            className="h-full rounded-full bg-gradient-to-r from-forest-300 to-forest transition-all duration-75"
            style={{ width: `${(loadTime / 0.8) * 100}%` }}
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-xl border border-ink-100 bg-paper-100 p-4 text-center">
            <p className="font-display text-2xl font-500 text-forest">{m.value}</p>
            <p className="text-xs text-ink-400 mt-1">{m.label}</p>
            <p className="text-xs text-ink-300 mt-0.5">Target: {m.target}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SaaS Development: Blueprint ────────────────────────────────
export function SaasBlueprintDemo() {
  const [activeModule, setActiveModule] = useState(0);
  const modules = [
    { icon: Users, name: 'Auth & Multi-tenancy', features: ['SSO/SAML', 'Role-based access', 'Tenant isolation', 'Usage quotas'] },
    { icon: Zap, name: 'Billing & Plans', features: ['Stripe integration', 'Tiered pricing', 'Usage-based billing', 'Dunning flows'] },
    { icon: Database, name: 'Data Architecture', features: ['PostgreSQL + RLS', 'Audit logging', 'API versioning', 'Webhooks'] },
    { icon: Activity, name: 'Monitoring & Ops', features: ['Error tracking', 'Uptime alerts', 'Usage analytics', 'Deploy pipeline'] },
  ];

  useEffect(() => {
    const timer = setInterval(() => setActiveModule((m) => (m + 1) % modules.length), 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="rounded-2xl border border-ink-100 bg-paper-50 p-6 sm:p-8">
      <div className="flex items-center gap-2.5">
        <Layers size={20} className="text-forest" strokeWidth={1.5} />
        <h3 className="font-display text-lg font-500 text-ink">SaaS Blueprint</h3>
      </div>
      <p className="mt-2 text-sm text-ink-500">Every SaaS we build includes these four pillars from day one.</p>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {modules.map((mod, i) => {
          const Icon = mod.icon;
          const isActive = activeModule === i;
          return (
            <div
              key={i}
              className={`rounded-xl border p-4 transition-all duration-500 ${
                isActive ? 'border-forest bg-forest-50 shadow-premium' : 'border-ink-100 bg-paper-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${isActive ? 'bg-forest text-paper-50' : 'bg-paper-300 text-ink-400'}`}>
                  <Icon size={15} strokeWidth={1.5} />
                </div>
                <p className="text-sm font-medium text-ink">{mod.name}</p>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {mod.features.map((f) => (
                  <span key={f} className={`rounded-full px-2.5 py-1 text-xs transition-colors ${isActive ? 'bg-forest-100 text-forest-600' : 'bg-paper-300 text-ink-400'}`}>
                    {f}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Demo Router ─────────────────────────────────────────────────
export function ServiceDemo({ demoType }: { demoType: string }) {
  switch (demoType) {
    case 'roi-calculator': return <RoiCalculatorDemo />;
    case 'workflow-builder': return <WorkflowBuilderDemo />;
    case 'agent-chat': return <AgentChatDemo />;
    case 'voice-simulator': return <VoiceSimulatorDemo />;
    case 'task-automator': return <TaskAutomatorDemo />;
    case 'crm-pipeline': return <CrmPipelineDemo />;
    case 'architecture-explorer': return <ArchitectureExplorerDemo />;
    case 'performance-demo': return <PerformanceDemo />;
    case 'saas-blueprint': return <SaasBlueprintDemo />;
    default: return null;
  }
}

// ─── Shared helpers ───────────────────────────────────────────────
function Slider({ label, value, min, max, step, onChange, prefix = '', suffix = '' }: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void; prefix?: string; suffix?: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-medium text-ink">{label}</label>
        <span className="font-mono text-sm text-forest">{prefix}{value}{suffix}</span>
      </div>
      <input type="range" value={value} min={min} max={max} step={step}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-forest cursor-pointer" />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-ink-500">{label}</span>
      <span className="font-medium text-ink">{value}</span>
    </div>
  );
}
