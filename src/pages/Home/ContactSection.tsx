import React, { useState, useRef } from 'react';
import { Send, Terminal, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { PROFILE } from '../../data/profile';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = 'Name is required';
  if (!form.email.trim()) errors.email = 'Email is required';
  else if (!validateEmail(form.email)) errors.email = 'Invalid email address';
  if (!form.subject.trim()) errors.subject = 'Subject is required';
  if (!form.message.trim()) errors.message = 'Message is required';
  else if (form.message.trim().length < 10) errors.message = 'Message must be at least 10 characters';
  return errors;
}

// ── Field component ────────────────────────────────────
interface FieldProps {
  label: string;
  prompt: string;
  name: keyof FormState;
  type?: string;
  value: string;
  error?: string;
  hasError: boolean;
  multiline?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

function Field({ label, prompt, name, type = 'text', value, error, hasError, multiline, onChange }: FieldProps) {
  return (
    <div className={`space-y-1 ${hasError ? 'animate-shake' : ''}`}>
      <label htmlFor={name} className="flex items-center gap-2 text-xs font-mono text-slate-400">
        <span className="text-accent-violet">{prompt}</span>
        <span>{label}</span>
        {error && <span className="text-red-400 ml-1">← {error}</span>}
      </label>
      {multiline ? (
        <textarea
          id={name}
          name={name}
          rows={5}
          value={value}
          onChange={onChange}
          className={`contact-input resize-none ${hasError ? 'border-red-500/60 focus:border-red-400' : ''}`}
          placeholder={`Enter ${label.toLowerCase()}...`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          className={`contact-input ${hasError ? 'border-red-500/60 focus:border-red-400' : ''}`}
          placeholder={`Enter ${label.toLowerCase()}...`}
        />
      )}
    </div>
  );
}

// ── Main component ─────────────────────────────────────
export default function ContactSection() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Set<keyof FormState>>(new Set());
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setTouched(prev => new Set(prev).add(name as keyof FormState));
    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate(form);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched(new Set(Object.keys(newErrors) as (keyof FormState)[]));
      return;
    }

    setStatus('loading');

    // Simulate a short delay then open mailto (no backend)
    await new Promise(resolve => setTimeout(resolve, 600));

    const subject = encodeURIComponent(form.subject);
    const body = encodeURIComponent(
      `Hi ${PROFILE.name},\n\nMy name is ${form.name}.\n\n${form.message}\n\nBest regards,\n${form.name}\n${form.email}`
    );
    window.location.href = `${PROFILE.socials.email}?subject=${subject}&body=${body}`;

    setStatus('success');
    setForm({ name: '', email: '', subject: '', message: '' });
    setTouched(new Set());
    setErrors({});

    // Reset success after 4s
    setTimeout(() => setStatus('idle'), 4000);
  };

  const fields: Omit<FieldProps, 'onChange'>[] = [
    { label: 'Name', prompt: '$', name: 'name', type: 'text', value: form.name, error: errors.name, hasError: !!errors.name && touched.has('name') },
    { label: 'Email', prompt: '@', name: 'email', type: 'email', value: form.email, error: errors.email, hasError: !!errors.email && touched.has('email') },
    { label: 'Subject', prompt: '#', name: 'subject', type: 'text', value: form.subject, error: errors.subject, hasError: !!errors.subject && touched.has('subject') },
    { label: 'Message', prompt: '>', name: 'message', value: form.message, error: errors.message, hasError: !!errors.message && touched.has('message'), multiline: true },
  ];

  return (
    <section id="contact" className="py-20 space-y-12">
      {/* Section header */}
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-border-dark to-transparent" />
        <h2 className="text-xs font-mono text-accent-emerald tracking-widest uppercase">
          // contact
        </h2>
        <div className="h-px flex-1 bg-gradient-to-l from-border-dark to-transparent" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left — context */}
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold font-heading text-slate-100 mb-2">Let's work together</h3>
            <p className="text-slate-400 leading-relaxed">
              Whether you have a project in mind, a course idea, or just want to connect — I'd love to hear from you.
              Fill in the form and your email client will open, ready to send.
            </p>
          </div>

          {/* Contact info */}
          <div className="space-y-3 font-mono text-sm">
            {[
              { key: 'email',    value: PROFILE.email,                         color: 'text-accent-emerald' },
              { key: 'github',   value: 'github.com/thanhmati',                 color: 'text-accent-cyan' },
              { key: 'linkedin', value: 'linkedin.com/in/thanh270600',          color: 'text-accent-cyan' },
              { key: 'udemy',    value: 'udemy.com/user/do-tan-thanh-2',        color: 'text-accent-violet' },
              { key: 'youtube',  value: 'youtube.com/@laptrinhfullstack',       color: 'text-[#ff4444]' },
            ].map(({ key, value, color }) => (
              <div key={key} className="flex gap-3 items-center">
                <span className="text-slate-500 min-w-20">{key}:</span>
                <span className={color}>{value}</span>
              </div>
            ))}
          </div>

          {/* Response time note */}
          <div className="flex items-start gap-3 p-4 rounded-lg border border-accent-cyan/20 bg-accent-cyan/5 text-sm text-slate-400">
            <Terminal className="w-4 h-4 text-accent-cyan mt-0.5 shrink-0" />
            <span>
              Typical response time is <span className="text-slate-200">24–48 hours</span>.
              For urgent inquiries, reach out directly via LinkedIn.
            </span>
          </div>
        </div>

        {/* Right — form */}
        <div className="rounded-xl border border-border-dark bg-card-dark/80 overflow-hidden glow-emerald">
          {/* Terminal title bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/80 border-b border-border-dark">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <span className="text-xs font-mono text-slate-400">contact.form</span>
            <span className="text-[10px] font-mono text-slate-600">mailto handler</span>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="p-6 space-y-5" noValidate>
            {fields.map(field => (
              <Field key={field.name} {...field} onChange={handleChange} />
            ))}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-accent-emerald text-slate-900 font-semibold text-sm hover:bg-emerald-300 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-md shadow-accent-emerald/20"
            >
              {status === 'loading' ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Opening email client...
                </>
              ) : status === 'success' ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Email client opened!
                </>
              ) : status === 'error' ? (
                <>
                  <AlertCircle className="w-4 h-4" />
                  Something went wrong
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </button>

            <p className="text-center text-xs font-mono text-slate-500">
              This will open your default email application.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
