import mongoose from 'mongoose';
import { randomUUID } from 'node:crypto';

// Same fields as the old Supabase tables. `_id` is a UUID string, exposed to the
// frontend as `id`, so the API response shape is identical to what the UI expected.
const toJSON = {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
};

const contactSchema = new mongoose.Schema(
  {
    _id: { type: String, default: () => randomUUID() },
    name: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String, default: null },
    service_interest: { type: String, default: null },
    message: { type: String, required: true },
    honeypot: { type: String, default: null },
    status: { type: String, required: true, default: 'new' },
    created_at: { type: Date, default: Date.now },
  },
  { collection: 'contact_submissions', toJSON, id: false }
);

const fieldNoteSchema = new mongoose.Schema(
  {
    _id: { type: String, default: () => randomUUID() },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    body: { type: String, required: true },
    category: { type: String, default: null },
    published_at: { type: Date, default: Date.now },
    created_at: { type: Date, default: Date.now },
  },
  { collection: 'field_notes', toJSON, id: false }
);

export const ContactSubmission =
  mongoose.models.ContactSubmission || mongoose.model('ContactSubmission', contactSchema);
export const FieldNote =
  mongoose.models.FieldNote || mongoose.model('FieldNote', fieldNoteSchema);

// Builds the connection string. Two ways to configure (parts are safest):
//   A) MONGODB_USER + MONGODB_PASSWORD + MONGODB_HOST [+ MONGODB_DB]  -> password is URL-encoded automatically
//   B) MONGODB_URI -> any raw special characters in the password are re-encoded automatically
export function resolveUri(env = process.env) {
  const clean = (v) => (v || '').trim().replace(/^['"]|['"]$/g, '');
  const uri0 = clean(env.MONGODB_URI);
  const user = clean(env.MONGODB_USER), pass = env.MONGODB_PASSWORD, host = clean(env.MONGODB_HOST);
  if (!uri0 && user && pass && host) {
    const db = clean(env.MONGODB_DB) || 'ganvora';
    const scheme = /localhost|127\.0\.0\.1/.test(host) ? 'mongodb' : 'mongodb+srv';
    return `${scheme}://${encodeURIComponent(user)}:${encodeURIComponent(clean(pass))}@${host}/${db}?retryWrites=true&w=majority&authSource=admin`;
  }
  const uri = uri0;
  const m = uri.match(/^(mongodb(?:\+srv)?:\/\/)([^:@/]*):(.*)@([^@/?]+)(.*)$/);
  if (!m) return uri;
  const [, scheme, u, p0, h, rest] = m;
  if (/^<.*>$/.test(p0) && /password|pass|pwd/i.test(p0)) return uri; // untouched placeholder -> checkUri explains it
  const p = /^<.*>$/.test(p0) && !/password|pass|pwd/i.test(p0) ? p0.slice(1, -1) : p0;
  const encoded = /%[0-9A-Fa-f]{2}/.test(p) && !/[@:/?#\s]/.test(p.replace(/%[0-9A-Fa-f]{2}/g, '')) ? p : encodeURIComponent(p);
  const withDb = /^\/[^?]+/.test(rest) ? rest : '/ganvora' + rest.replace(/^\//, '');
  return `${scheme}${u}:${encoded}@${h}${withDb}`;
}

// Safe-to-print summary of the URI (password never shown, only its length).
export function describeUri(uri = '') {
  const m = uri.match(/^(mongodb(?:\+srv)?):\/\/([^:@/]*)(?::(.*))?@([^@/?]+)\/?([^?]*)/);
  if (!m) return 'URI could not be parsed (check the format)';
  const [, scheme, user, pass = '', host, db] = m;
  const warn = [];
  if (/[<>]/.test(pass)) warn.push('password contains < >');
  if (/[@:/?#%\s]/.test(pass.replace(/%[0-9A-Fa-f]{2}/g, ''))) warn.push('password has special chars - URL-encode them');
  if (/^["']|["']$/.test(uri)) warn.push('URI has quotes');
  if (!db) warn.push('no database name (add /ganvora before ?)');
  return `${scheme}://${user}:${'*'.repeat(Math.min(pass.length, 12))}(${pass.length} chars)@${host}/${db}` + (warn.length ? `  !! ${warn.join('; ')}` : '');
}

function checkUri(uri) {
  if (uri && /^mongodb(\+srv)?:\/\/[^:@/]+@/.test(uri)) {
    throw new Error('MONGODB_URI has no password: put a colon between username and password -> mongodb+srv://USERNAME:PASSWORD@host/ganvora');
  }
  if (!uri) throw new Error('MongoDB is not configured. Add it to .env (local) or Vercel Environment Variables.');
  if (/[<>]/.test(uri)) {
    throw new Error('MONGODB_URI still contains a <placeholder>. Use the format mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/ganvora (a colon between username and password, real password, no < > brackets).');
  }
  if (!/^mongodb(\+srv)?:\/\//.test(uri)) throw new Error('MONGODB_URI must start with mongodb:// or mongodb+srv://');
}

// Cached connection: required for Vercel serverless (function instances are reused between requests).
const cache = globalThis.__ganvoraMongo || (globalThis.__ganvoraMongo = { promise: null });

export function connectDB(uri = resolveUri()) {
  if (mongoose.connection.readyState === 1) return Promise.resolve(mongoose.connection);
  if (!cache.promise) {
    checkUri(uri);
    mongoose.set('strictQuery', true);
    cache.promise = mongoose
      .connect(uri, { serverSelectionTimeoutMS: 10000, maxPoolSize: 5 })
      .then(async (m) => {
        await FieldNote.init(); // make sure the unique slug index exists
        return m.connection;
      })
      .catch((err) => {
        cache.promise = null; // allow retry on next request
        throw err;
      });
  }
  return cache.promise;
}

// Insert the 4 original notes if missing (same as `ON CONFLICT (slug) DO NOTHING`).
export async function seedFieldNotes(notes) {
  let added = 0;
  for (const n of notes) {
    const res = await FieldNote.updateOne(
      { slug: n.slug },
      { $setOnInsert: { _id: randomUUID(), ...n, published_at: new Date(n.published_at), created_at: new Date() } },
      { upsert: true }
    );
    if (res.upsertedCount) added++;
  }
  return added;
}
