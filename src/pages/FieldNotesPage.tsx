import { useEffect, useState } from 'react';
import { Link, useRouter } from '@/lib/router';
import { AnimatedSection } from '@/components/AnimatedSection';
import { api, type FieldNote } from '@/lib/api';
import { ArrowLeft, ArrowRight, FileText, Loader2 } from 'lucide-react';

export function FieldNotesPage() {
  const { navigate } = useRouter();
  const [notes, setNotes] = useState<FieldNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await api.getFieldNotes();
        setNotes(data ?? []);
      } catch (err) {
        console.error('Error fetching field notes:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const categoryLabel = (category: string | null) => {
    switch (category) {
      case 'teardown': return 'Teardown';
      case 'build-log': return 'Build Log';
      case 'open-source': return 'Open Source';
      default: return 'Note';
    }
  };

  return (
    <section className="container-editorial pt-24 pb-32 sm:pt-32">
      <AnimatedSection>
        <div className="max-w-2xl">
          <p className="label-mono">Field Notes</p>
          <span className="mt-2 block h-px w-8 bg-forest" />
          <h1 className="mt-6 font-display text-display-xl font-400 text-ink text-balance">
            Building in public.
          </h1>
          <p className="mt-8 text-lg leading-relaxed text-ink-500">
            Real teardowns, build logs, and open-source tools from our work
            building AI systems and automation. No fabricated case studies —
            these are the actual things we've built, what worked, and what
            didn't.
          </p>
        </div>
      </AnimatedSection>

      {loading && (
        <div className="mt-20 flex items-center justify-center py-20">
          <Loader2 size={24} className="animate-spin text-ink-300" />
        </div>
      )}

      {error && !loading && (
        <div className="mt-20 rounded-xl border border-oxblood-100 bg-oxblood-50 px-6 py-8 text-center">
          <p className="text-sm text-oxblood-600">Couldn't load field notes right now. Please try again later.</p>
        </div>
      )}

      {!loading && !error && notes.length === 0 && (
        <div className="mt-20 rounded-xl border border-ink-100 bg-paper-200 px-6 py-12 text-center">
          <FileText size={32} className="mx-auto text-ink-300" strokeWidth={1.5} />
          <p className="mt-4 text-sm text-ink-500">No field notes published yet. Check back soon.</p>
        </div>
      )}

      {!loading && !error && notes.length > 0 && (
        <div className="mt-16 divide-y divide-ink-100 border-t border-ink-100">
          {notes.map((note, i) => (
            <article
              key={note.id}
              onClick={() => navigate(`/field-notes/${note.slug}`)}
              className="group flex cursor-pointer gap-6 py-8 transition-colors hover:bg-paper-200/50 -mx-4 px-4 rounded-lg sm:gap-10"
            >
              <div className="hidden shrink-0 flex-col items-center gap-3 pt-1 sm:flex">
                <span className="font-mono text-xs text-ink-300">0{i + 1}</span>
                <span className="w-px flex-1 bg-ink-100 transition-colors group-hover:bg-forest-200" />
              </div>
              <div className="max-w-2xl">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-forest-50 px-3 py-1 text-xs font-medium text-forest-600">
                    {categoryLabel(note.category)}
                  </span>
                  <time className="text-xs text-ink-400">{formatDate(note.published_at)}</time>
                </div>
                <h2 className="mt-4 font-display text-xl font-500 text-ink transition-colors group-hover:text-forest sm:text-2xl">
                  {note.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-500">{note.excerpt}</p>
                <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-forest">
                  Read note <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export function FieldNoteDetailPage({ slug }: { slug: string }) {
  const { navigate } = useRouter();
  const [note, setNote] = useState<FieldNote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    const fetchNote = async () => {
      try {
        const data = await api.getFieldNote(slug);
        setNote(data);
      } catch (err) {
        console.error('Error fetching field note:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 size={24} className="animate-spin text-ink-300" />
      </div>
    );
  }

  if (error || !note) {
    return (
      <section className="container-editorial pt-32 pb-32 text-center">
        <h1 className="font-display text-3xl font-500 text-ink">Note not found</h1>
        <button onClick={() => navigate('/field-notes')} className="btn-secondary mt-8">
          <ArrowLeft size={16} /> Back to field notes
        </button>
      </section>
    );
  }

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const categoryLabel = (category: string | null) => {
    switch (category) {
      case 'teardown': return 'Teardown';
      case 'build-log': return 'Build Log';
      case 'open-source': return 'Open Source';
      default: return 'Note';
    }
  };

  const renderMarkdown = (body: string) => {
    const lines = body.split('\n');
    const elements: React.ReactNode[] = [];
    let key = 0;

    lines.forEach((line) => {
      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={key++} className="mt-10 mb-4 font-display text-2xl font-500 text-ink">{line.slice(3)}</h2>
        );
      } else if (line.startsWith('1. ') || /^\d+\.\s/.test(line)) {
        const content = line.replace(/^\d+\.\s/, '');
        elements.push(
          <li key={key++} className="ml-6 list-decimal text-base leading-relaxed text-ink-500">{parseInline(content)}</li>
        );
      } else if (line.startsWith('- ')) {
        elements.push(
          <li key={key++} className="ml-6 list-disc text-base leading-relaxed text-ink-500">{parseInline(line.slice(2))}</li>
        );
      } else if (line.trim() === '') {
        return;
      } else {
        elements.push(
          <p key={key++} className="mb-4 text-base leading-relaxed text-ink-500">{parseInline(line)}</p>
        );
      }
    });

    return <div className="max-w-prose">{elements}</div>;
  };

  const parseInline = (text: string): React.ReactNode => {
    const parts = text.split(/(\*\*[^*]+\*\*)/);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-medium text-ink">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <article className="container-editorial pt-24 pb-32 sm:pt-32">
      <button onClick={() => navigate('/field-notes')}
        className="flex items-center gap-2 text-sm text-ink-400 hover:text-ink transition-colors">
        <ArrowLeft size={15} /> All field notes
      </button>

      <div className="mt-10 max-w-prose">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-forest-50 px-3 py-1 text-xs font-medium text-forest-600">
            {categoryLabel(note.category)}
          </span>
          <time className="text-xs text-ink-400">{formatDate(note.published_at)}</time>
        </div>
        <h1 className="mt-6 font-display text-display-md font-400 text-ink">{note.title}</h1>
      </div>

      <div className="mt-10 max-w-prose border-y border-forest-100 bg-forest-50 px-6 py-6 sm:px-8">
        <p className="font-display text-xl font-500 leading-snug text-ink sm:text-2xl">
          "{note.excerpt}"
        </p>
      </div>

      <div className="mt-12 border-t border-ink-100 pt-12">{renderMarkdown(note.body)}</div>

      <div className="mt-16 border-t border-ink-100 pt-8">
        <Link to="/field-notes" className="flex items-center gap-2 text-sm font-medium text-forest">
          <ArrowLeft size={15} /> Back to all field notes
        </Link>
      </div>
    </article>
  );
}
