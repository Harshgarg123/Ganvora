import { useState, type FormEvent } from 'react';
import { api } from '@/lib/api';
import { services } from '@/lib/content';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

interface FormState {
  name: string;
  email: string;
  company: string;
  service_interest: string;
  message: string;
  honeypot: string;
}

const initialState: FormState = {
  name: '',
  email: '',
  company: '',
  service_interest: '',
  message: '',
  honeypot: '',
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) newErrors.name = 'Please enter your name.';
    if (!form.email.trim()) {
      newErrors.email = 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!form.message.trim()) {
      newErrors.message = 'Please tell us what you need.';
    } else if (form.message.trim().length < 10) {
      newErrors.message = 'A bit more detail would help — at least 10 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (form.honeypot) {
      setStatus('success');
      return;
    }
    if (!validate()) return;

    setStatus('submitting');
    try {
      await api.submitContact({
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.company.trim() || null,
        service_interest: form.service_interest || null,
        message: form.message.trim(),
        honeypot: form.honeypot || null,
      });

      setStatus('success');
      setForm(initialState);
    } catch (err) {
      console.error('Contact form error:', err);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-forest-100 bg-forest-50 px-8 py-16 text-center">
        <CheckCircle2 size={48} className="text-forest" strokeWidth={1.5} />
        <h3 className="mt-6 font-display text-2xl font-500 text-ink">Message received.</h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-500">
          We read every inquiry and respond within one business day. If you need
          to reach us sooner, email{' '}
          <a href="mailto:hello@ganvora.com" className="text-forest link-underline">hello@ganvora.com</a>.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-8 text-sm text-ink-500 hover:text-ink transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {status === 'error' && (
        <div className="flex items-start gap-3 rounded-xl border border-oxblood-100 bg-oxblood-50 px-5 py-4">
          <AlertCircle size={18} className="mt-0.5 shrink-0 text-oxblood" />
          <p className="text-sm text-oxblood-600">
            Something went wrong sending your message. Please try again, or email
            us directly at{' '}
            <a href="mailto:ganvoraa@gmail.com" className="link-underline font-medium">ganvoraa@gmail.com</a>.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Name" required error={errors.name} value={form.name}
          onChange={(v) => handleChange('name', v)} placeholder="Jane Smith" autoComplete="name" />
        <Field label="Email" required type="email" error={errors.email} value={form.email}
          onChange={(v) => handleChange('email', v)} placeholder="jane@company.com" autoComplete="email" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Organization" optional value={form.company}
          onChange={(v) => handleChange('company', v)} placeholder="Acme Corp" autoComplete="organization" />
        <div>
          <label className="mb-2 block text-sm font-medium text-ink">
            Service interest <span className="text-ink-300 font-normal">(optional)</span>
          </label>
          <select
            value={form.service_interest}
            onChange={(e) => handleChange('service_interest', e.target.value)}
            className="input-premium"
          >
            <option value="">Not sure yet</option>
            {services.map((s) => (
              <option key={s.slug} value={s.name}>{s.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-ink">
          What do you need? <span className="text-oxblood">*</span>
        </label>
        <textarea
          value={form.message}
          onChange={(e) => handleChange('message', e.target.value)}
          rows={5}
          placeholder="Tell us about your business and what you're trying to automate..."
          className={`input-premium resize-none ${errors.message ? '!border-oxblood' : ''}`}
        />
        {errors.message && <p className="mt-1.5 text-xs text-oxblood">{errors.message}</p>}
      </div>

      <div className="hidden" aria-hidden="true">
        <label>
          Leave this field empty
          <input type="text" value={form.honeypot}
            onChange={(e) => handleChange('honeypot', e.target.value)}
            tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full sm:w-auto">
        {status === 'submitting' ? (
          <><Loader2 size={16} className="animate-spin" /> Sending...</>
        ) : (
          <><Send size={16} /> Send message</>
        )}
      </button>
    </form>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  autoComplete?: string;
}

function Field({ label, value, onChange, placeholder, type = 'text', required, optional, error, autoComplete }: FieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-ink">
        {label}{' '}
        {required && <span className="text-oxblood">*</span>}
        {optional && <span className="text-ink-300 font-normal">(optional)</span>}
      </label>
      <input
        type={type} value={value} onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder} autoComplete={autoComplete}
        className={`input-premium ${error ? '!border-oxblood' : ''}`}
      />
      {error && <p className="mt-1.5 text-xs text-oxblood">{error}</p>}
    </div>
  );
}
