import { describeEnv } from './env.js';
import express from 'express';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import seedNotes from './field-notes.seed.js';
import { connectDB, seedFieldNotes, describeUri, resolveUri, FieldNote, ContactSubmission } from './db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 5000;
const MONGODB_URI = resolveUri();
const seedData = () => seedNotes;
let seeded = false;

export function createApp() {
  const app = express();
  app.disable('x-powered-by');
  app.use(express.json({ limit: '50kb' }));

  app.get('/api/health', async (_req, res) => {
    try {
      await connectDB(MONGODB_URI);
      if (!seeded) {
        if ((await FieldNote.estimatedDocumentCount()) === 0) await seedFieldNotes(seedData());
        seeded = true;
      }
      res.json({ ok: true, db: 'connected', notes: await FieldNote.countDocuments() });
    } catch (err) {
      res.status(500).json({ ok: false, db: 'error', message: err.message, using: describeUri(MONGODB_URI), env: describeEnv().split('\n  ') });
    }
  });

  // Make sure MongoDB is connected (and seeded once) before any /api route runs.
  app.use('/api', async (_req, res, next) => {
    try {
      await connectDB(MONGODB_URI);
      if (!seeded) {
        if ((await FieldNote.estimatedDocumentCount()) === 0) await seedFieldNotes(seedData());
        seeded = true;
      }
      next();
    } catch (err) {
      console.error('MongoDB connection error:', err.message);
      _req.dbDown = true; // field notes fall back to bundled data; contact form reports an error
      next();
    }
  });

  // ---- Field notes (public, read-only) ----
  // Bundled copy of the original notes, used only while MongoDB is unreachable.
  const fallbackNotes = () =>
    seedData()
      .map((n) => ({ id: n.slug, ...n, created_at: n.published_at }))
      .sort((a, b) => new Date(b.published_at) - new Date(a.published_at));

  app.get('/api/field-notes', async (req, res) => {
    if (req.dbDown) {
      res.set('X-Data-Source', 'seed-fallback');
      return res.json(fallbackNotes());
    }
    try {
      const notes = await FieldNote.find().sort({ published_at: -1 });
      res.json(notes);
    } catch (err) {
      console.error('GET /api/field-notes', err);
      res.status(500).json({ error: 'Failed to load field notes' });
    }
  });

  app.get('/api/field-notes/:slug', async (req, res) => {
    if (req.dbDown) {
      const slug = req.params.slug.replace(/\/+$/, '');
      const n = fallbackNotes().find((x) => x.slug === slug);
      res.set('X-Data-Source', 'seed-fallback');
      return n ? res.json(n) : res.status(404).json({ error: 'Not found' });
    }
    try {
      const note = await FieldNote.findOne({ slug: req.params.slug.replace(/\/+$/, '') });
      if (!note) return res.status(404).json({ error: 'Not found' });
      res.json(note);
    } catch (err) {
      console.error('GET /api/field-notes/:slug', err);
      res.status(500).json({ error: 'Failed to load field note' });
    }
  });

  // ---- Contact form (public, insert-only) ----
  const hits = new Map(); // tiny in-memory rate limit: 5 submissions / 10 min / IP
  app.post('/api/contact', async (req, res) => {
    if (req.dbDown) return res.status(503).json({ error: 'Database unavailable' });
    const ip = req.ip;
    const now = Date.now();
    const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
    if (recent.length >= 5) return res.status(429).json({ error: 'Too many requests' });

    const b = req.body || {};
    const str = (v) => (typeof v === 'string' ? v.trim() : '');
    if (str(b.honeypot)) return res.status(201).json({ ok: true }); // silently drop bots

    const name = str(b.name), email = str(b.email), message = str(b.message);
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10) {
      return res.status(400).json({ error: 'Invalid submission' });
    }
    try {
      await ContactSubmission.create({
        name,
        email,
        company: str(b.company) || null,
        service_interest: str(b.service_interest) || null,
        message,
        honeypot: null,
      });
      recent.push(now);
      hits.set(ip, recent);
      res.status(201).json({ ok: true });
    } catch (err) {
      console.error('POST /api/contact', err);
      res.status(500).json({ error: 'Failed to save submission' });
    }
  });

  app.use('/api', (_req, res) => res.status(404).json({ error: 'Not found' }));

  // ---- Serve the built frontend in production (SPA fallback) ----
  const dist = path.resolve(__dirname, '../dist');
  if (fs.existsSync(dist)) {
    app.use(express.static(dist));
    app.use((req, res, next) => {
      if (req.method !== 'GET') return next();
      res.sendFile(path.join(dist, 'index.html'));
    });
  }
  return app;
}

async function main() {
  try {
    await connectDB(MONGODB_URI);
    console.log('MongoDB connected ->', (await import('mongoose')).default.connection.name);
    const added = await seedFieldNotes(seedData());
    if (added) console.log(`Seeded ${added} field note(s)`);
    seeded = true;
  } catch (err) {
    console.error('\n*** MongoDB connection FAILED ***\n' + err.message);
    console.error('App is using: ' + describeUri(MONGODB_URI));
    console.error('Environment check:\n  ' + describeEnv());
    console.error('Fix .env / Atlas Network Access, the API will keep retrying on each request.\n');
  }
  createApp().listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
