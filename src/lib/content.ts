export interface Service {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  whoItsFor: string;
  whatsIncluded: string[];
  engagement: string;
  icon: string;
  demoType: string;
}

export const services: Service[] = [
  {
    slug: 'ai-consulting',
    name: 'AI Consulting',
    category: 'AI',
    tagline: 'Strategy tied to measurable outcomes',
    description:
      'We assess where AI creates real value in your business and build a roadmap tied to measurable outcomes — not technology for its own sake. Every recommendation comes with an ROI projection and a build plan.',
    whoItsFor:
      'Companies that know they should be using AI but aren\u2019t sure where to start, or teams that have tried AI tools without seeing results. If you need a clear strategy before investing in build, this is your entry point.',
    whatsIncluded: [
      'Full operational audit of your current workflows and tooling',
      'AI opportunity assessment with prioritized use cases',
      'ROI projections tied to each recommended initiative',
      'Phased implementation roadmap with timelines',
      'Technology stack recommendations and vendor evaluation',
      'Team training and enablement plan',
    ],
    engagement: '2\u20134 weeks. Scoped per project.',
    icon: 'compass',
    demoType: 'roi-calculator',
  },
  {
    slug: 'automation-systems',
    name: 'Automation Systems',
    category: 'Systems',
    tagline: 'Work that moves itself from start to finish',
    description:
      'We connect your tools and eliminate manual handoffs so work moves from trigger to completion on its own — reliably, every time. No more copy-paste between systems, no more \u201cdid you see my email?\u201d, no more dropped tasks.',
    whoItsFor:
      'Operations-heavy teams spending hours on repetitive cross-system work — data entry, status updates, notifications, handoffs. If your team is the glue between your tools, this replaces them with systems.',
    whatsIncluded: [
      'End-to-end workflow mapping and bottleneck identification',
      'Custom automation pipelines connecting your existing tools',
      'Trigger-based event routing across Slack, email, CRM, and databases',
      'Error handling, retry logic, and failure notifications',
      'Real-time monitoring dashboard',
      'Documentation and team handoff',
    ],
    engagement: '4\u20138 weeks. Scoped per project.',
    icon: 'workflow',
    demoType: 'workflow-builder',
  },
  {
    slug: 'ai-agents',
    name: 'AI Agents',
    category: 'AI',
    tagline: 'Autonomous workers that never clock out',
    description:
      'Autonomous agents that handle research, outreach, scheduling, and decision workflows around the clock without supervision. They don\u2019t just answer questions — they take action, learn from outcomes, and improve over time.',
    whoItsFor:
      'Teams with knowledge work that follows a repeatable pattern — research, qualification, outreach, data enrichment, scheduling. If you have a role that\u2019s mostly \u201cread, decide, act,\u201d an agent can own it.',
    whatsIncluded: [
      'Custom agent architecture with tool-use capabilities',
      'Integration with your data sources and APIs',
      'Decision frameworks with human-in-the-loop checkpoints',
      'Memory and context management for long-running tasks',
      'Performance analytics and outcome tracking',
      'Guardrails, rate limits, and safety boundaries',
    ],
    engagement: '4\u20136 weeks. Scoped per project.',
    icon: 'bot',
    demoType: 'agent-chat',
  },
  {
    slug: 'voice-ai',
    name: 'Voice AI',
    category: 'AI',
    tagline: 'Natural voice agents available 24/7',
    description:
      'Natural voice agents for inbound support, qualification, and scheduling — in multiple languages, available 24/7. Callers don\u2019t press 1 for anything. They talk, the agent listens, and the work gets done.',
    whoItsFor:
      'Any business that loses opportunities to missed calls — clinics, service companies, sales teams, support desks. If a ringing phone represents revenue and you can\u2019t always answer, this is the fix.',
    whatsIncluded: [
      'Custom voice agent trained on your scripts and knowledge base',
      'Natural conversation with interruption handling and follow-up questions',
      'Multi-language support out of the box',
      'CRM/booking system integration for real-time scheduling',
      'Call routing and escalation to human team when needed',
      'Call transcripts, summaries, and analytics dashboard',
    ],
    engagement: '3\u20136 weeks. Scoped per project.',
    icon: 'phone-call',
    demoType: 'voice-simulator',
  },
  {
    slug: 'business-automation',
    name: 'Business Automation',
    category: 'Systems',
    tagline: 'Hand the busywork to systems that never tire',
    description:
      'From data entry to follow-ups, we hand the busywork to systems that never tire and never forget — across your entire operation. Invoices get generated, reports get sent, reminders go out, and nobody has to remember to do it.',
    whoItsFor:
      'Small-to-mid businesses where the founder or a key employee is the bottleneck for routine tasks — invoicing, reporting, follow-ups, compliance checks. If it\u2019s repetitive and important, it should be automated.',
    whatsIncluded: [
      'Process inventory and automation priority matrix',
      'Automated document generation (invoices, reports, contracts)',
      'Scheduled task chains with conditional logic',
      'Notification and reminder systems across channels',
      'Integration with accounting, project management, and communication tools',
      'Audit trail and compliance logging',
    ],
    engagement: '3\u20136 weeks. Scoped per project.',
    icon: 'repeat',
    demoType: 'task-automator',
  },
  {
    slug: 'crm-systems',
    name: 'CRM Systems',
    category: 'Systems',
    tagline: 'Your team closes — the system handles the rest',
    description:
      'Automated pipelines, follow-ups, and data entry so your team focuses on closing — not chasing, not typing, not remembering. Leads come in, the system nurtures them, and your team gets a warm handoff at the right moment.',
    whoItsFor:
      'Sales teams losing deals to slow follow-ups and poor pipeline visibility. If your CRM is a data graveyard instead of an active sales engine, this rebuilds it into one that works for you.',
    whatsIncluded: [
      'CRM setup or migration with custom pipeline stages',
      'Automated lead scoring and routing',
      'Multi-step follow-up sequences triggered by behavior',
      'Auto-populated contact records from email, calls, and meetings',
      'Pipeline analytics and forecasting dashboard',
      'Integration with calendar, email, and calling tools',
    ],
    engagement: '3\u20135 weeks. Scoped per project.',
    icon: 'users',
    demoType: 'crm-pipeline',
  },
  {
    slug: 'custom-software',
    name: 'Custom Software',
    category: 'Engineering',
    tagline: 'Built around your operations — not almost-fit tools',
    description:
      'Bespoke applications built around your exact operations — not the constraints of off-the-shelf tools that almost fit. When your process is your competitive advantage, your software should reflect it, not force you to bend.',
    whoItsFor:
      'Companies that have outgrown spreadsheets and SaaS tools, or whose core process can\u2019t be served by any existing product. If you\u2019re paying for five tools that each do 60% of what you need, this replaces them with one that does 100%.',
    whatsIncluded: [
      'Requirements discovery and technical architecture design',
      'Full-stack development with modern, scalable technology',
      'Custom integrations with your existing systems',
      'Role-based access control and audit logging',
      'Automated testing and CI/CD pipeline',
      'Deployment, documentation, and ongoing support',
    ],
    engagement: '6\u201312 weeks. Scoped per project.',
    icon: 'code',
    demoType: 'architecture-explorer',
  },
  {
    slug: 'web-platforms',
    name: 'Web Platforms',
    category: 'Engineering',
    tagline: 'Engineered to convert and built to scale',
    description:
      'High-performance websites and platforms engineered to convert visitors and scale with your business as it grows. Not a template — a custom-built platform where every section serves a measurable goal.',
    whoItsFor:
      'Companies whose website is their primary sales channel but is underperforming — slow, hard to update, or not converting. If your site is a brochure when it should be a sales engine, this rebuilds it.',
    whatsIncluded: [
      'Conversion-optimized design with A/B testing infrastructure',
      'Sub-second page loads with edge caching and image optimization',
      'CMS integration for non-technical content updates',
      'Analytics, heat mapping, and conversion tracking setup',
      'SEO architecture with structured data and sitemap',
      'Scalable hosting and CI/CD deployment pipeline',
    ],
    engagement: '4\u20138 weeks. Scoped per project.',
    icon: 'globe',
    demoType: 'performance-demo',
  },
  {
    slug: 'saas-development',
    name: 'SaaS Development',
    category: 'Engineering',
    tagline: 'From idea to launch — architecture included',
    description:
      'Product-grade SaaS platforms from idea to launch — architecture, UX, and infrastructure included from day one. You bring the domain expertise; we bring the engineering to make it real, scalable, and sellable.',
    whoItsFor:
      'Founders and teams with a SaaS idea or internal tool that needs to become a real product. If you\u2019ve been told \u201cjust use no-code\u201d and hit the ceiling, this is the path to a real, ownable product.',
    whatsIncluded: [
      'Technical architecture and database design',
      'Full-stack development with modern framework',
      'Authentication, billing, and multi-tenancy from day one',
      'Admin dashboard and user management system',
      'API design and third-party integrations',
      'Production deployment with monitoring and alerting',
    ],
    engagement: '8\u201316 weeks. Scoped per project.',
    icon: 'layers',
    demoType: 'saas-blueprint',
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    question: 'How much does an engagement cost?',
    answer:
      'Every project is scoped individually based on complexity, integrations, and timeline. After a discovery call, you receive a detailed proposal with a fixed scope and price — no hourly billing, no surprise invoices. Most engagements range from a few thousand to tens of thousands depending on the breadth of work.',
  },
  {
    question: 'How long does a project take?',
    answer:
      'AI Consulting engagements take 2\u20134 weeks. Automation and AI Agent projects run 3\u20138 weeks. Custom Software and SaaS Development can range from 6\u201316 weeks. These are real timelines, not optimistic estimates — you\u2019ll see the full schedule in the proposal.',
  },
  {
    question: 'Do you work with specific industries?',
    answer:
      'No. We work across industries — healthcare, real estate, finance, e-commerce, logistics, professional services. The common thread isn\u2019t the industry, it\u2019s the problem: manual work that should be automated, and systems that should be smarter.',
  },
  {
    question: 'Do you sign NDAs?',
    answer:
      'Yes. We sign mutual NDAs on request before any discovery call that involves sharing operational details or business data. All work is confidential by default.',
  },
  {
    question: 'Do you work with clients outside the US?',
    answer:
      'Yes. We work with clients globally. We schedule calls across time zones and configure all systems for your local numbers, languages, and compliance requirements.',
  },
  {
    question: 'What happens after launch?',
    answer:
      'Every engagement includes 30 days of post-launch monitoring and tuning. After that, you can take over in-house or continue with a monthly support retainer. You own all code, documentation, and infrastructure — no lock-in.',
  },
  {
    question: 'Do you offer ongoing support?',
    answer:
      'Yes. Optional monthly retainers cover monitoring, updates, and new feature development. You\u2019re never forced into a retainer — the system is yours, and you can maintain it yourself or with any team you choose.',
  },
];

export interface TrustBadge {
  icon: string;
  label: string;
  description: string;
}

export const trustBadges: TrustBadge[] = [
  {
    icon: 'user-check',
    label: 'Direct Access',
    description: 'You work with the team building your system. No project managers, no handoffs.',
  },
  {
    icon: 'lock',
    label: 'Scoped Delivery',
    description: 'Every proposal has a fixed scope and price. No open-ended hourly billing.',
  },
  {
    icon: 'shield',
    label: 'NDA On Request',
    description: 'Mutual NDAs before discovery. All work is confidential by default.',
  },
  {
    icon: 'globe',
    label: 'Global Clients',
    description: 'We work across time zones, languages, and compliance frameworks.',
  },
];
