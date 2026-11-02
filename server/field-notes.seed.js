// Original 4 Field Notes (copied from the Supabase migration). Imported statically so it is always bundled on Vercel.
export default [
  {
    "title": "Teardown: A Dental Clinic's Scheduling Funnel",
    "slug": "teardown-dental-clinic-scheduling-funnel",
    "excerpt": "How a 3-location dental practice was losing 40% of new-patient calls to voicemail — and what an AI triage assistant would fix.",
    "body": "## The problem\n\nA 3-location dental practice in the Pacific Northwest was routing all new-patient calls to a shared front desk line. During lunch, breaks, and after hours, calls hit voicemail. Their call log showed 38% of new-patient calls went unanswered during business hours.\n\n## What I found\n\nThe clinic had a modern EHR and a decent website, but the gap was in the phone channel — the place where most new patients still start. Their existing \"after-hours\" voicemail greeting was a generic mailbox with no callback workflow.\n\n## What an AI triage assistant would fix\n\n1. **After-hours intake**: An AI voice agent answers every call, collects patient name, symptoms, and preferred appointment time, and texts a booking link.\n2. **Lunch coverage**: Same agent handles the 12–1pm gap without staffing changes.\n3. **Call routing**: Urgent symptoms (severe pain, swelling) get escalated to an on-call dentist via SMS within 30 seconds.\n\n## The math\n\nAt an average new-patient value of $850 (first visit + follow-up), recovering even half of those missed calls adds roughly $11,000/month in revenue for a practice this size. The automation costs less than a tenth of that to run.\n\nThis is a worked example, not a paid engagement. The clinic is anonymized.",
    "category": "teardown",
    "published_at": "2025-11-12T09:00:00.000Z"
  },
  {
    "title": "Build Log: Open-Source Lead Response Time Calculator",
    "slug": "build-log-lead-response-time-calculator",
    "excerpt": "I built a small, free tool that calculates how fast your business responds to leads — and why that number matters more than most clinics think.",
    "body": "## Why I built this\n\nMost independent clinics don't know their lead response time. They know how many calls they get, but not how long it takes to call back someone who left a voicemail or filled a web form.\n\nResearch from Dr. James Oldroyd at MIT (published in the Harvard Business Review) found that the odds of converting a lead drop by 10x if you take more than 5 minutes to respond vs. 1 minute. For clinics, this is the difference between a booked patient and a no-show who went to the next clinic on Google.\n\n## What the tool does\n\nYou enter: number of leads per week, average response time in hours, and your average patient value. It outputs: estimated revenue left on the table per month, and the breakeven cost of an automation that responds in under 60 seconds.\n\n## What's open source\n\nThe calculator is live on this site (see the Home page). The logic is simple enough that I open-sourced the core calculation under MIT. You can read the exact formula in the source.\n\nNo email gate, no signup. If it's useful, share it.",
    "category": "open-source",
    "published_at": "2025-12-03T14:00:00.000Z"
  },
  {
    "title": "Build Log: Automated Follow-Up Sequence for a Chiropractic Clinic",
    "slug": "build-log-automated-follow-up-chiropractic",
    "excerpt": "A 2-location chiropractic clinic was losing patients between the first visit and the third. Here's the follow-up sequence I built and what it changed.",
    "body": "## The setup\n\nA chiropractic clinic with two locations had a 51% drop-off between the first visit and the recommended third visit. Patients would come in for an initial assessment, get a 6-visit care plan, and then stop showing up after visit 1 or 2.\n\n## What I built\n\nAn automated follow-up sequence triggered by visit completion in their EHR:\n\n1. **2 hours after visit 1**: SMS with a short video from the chiropractor explaining what to expect at visit 2 and why it matters.\n2. **Day 2**: Email with a progress checklist and a reschedule link if they haven't booked.\n3. **Day 4**: SMS reminder with a one-tap confirm link.\n4. **Day 6**: If still unbooked, a final SMS with a direct line to the front desk.\n\n## What changed\n\nOver 8 weeks, the visit-1-to-visit-3 retention went from 49% to 71%. The clinic didn't add staff or change their care protocol — the only variable was the follow-up sequence.\n\nThis was a discounted early engagement. The clinic agreed to let me publish the results (anonymized) in exchange for a reduced rate.",
    "category": "build-log",
    "published_at": "2026-01-15T10:00:00.000Z"
  },
  {
    "title": "Teardown: Why Most Clinic Websites Have No Autoresponder",
    "slug": "teardown-clinic-websites-no-autoresponder",
    "excerpt": "I checked 50 independent clinic websites. 44 had contact forms with no autoresponder. Here's why that's the most expensive oversight in clinic marketing.",
    "body": "## What I did\n\nI visited the websites of 50 independent healthcare clinics (dental, chiropractic, optometry, physical therapy) across 5 cities. For each, I filled out the contact form with a test inquiry and timed how long it took to get any response.\n\n## What I found\n\n- 44 out of 50 had no autoresponder — the form submitted to a black hole with no confirmation.\n- Of the 6 that did respond, 4 took more than 24 hours.\n- Only 2 responded in under 1 hour.\n\n## Why this matters\n\nWhen a patient fills out a contact form, they're actively shopping. If your form goes into a void, they fill out the next clinic's form 5 minutes later. An autoresponder isn't a nice-to-have — it's the difference between a booked appointment and a lost patient.\n\n## The fix\n\nA simple autoresponder that fires within 60 seconds of form submission, confirms the inquiry was received, sets expectations on response time, and includes a booking link. This is a 2-hour build. It should be the first thing every clinic automates.\n\nThis teardown is based on publicly available websites. No clinic was contacted as a client.",
    "category": "teardown",
    "published_at": "2026-02-20T12:00:00.000Z"
  }
];
