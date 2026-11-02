// OPTIONAL: copy existing live data out of the old Supabase project into MongoDB.
// Usage: SUPABASE_URL=... SUPABASE_SERVICE_KEY=... node server/migrate-from-supabase.js
// (field_notes can be read with the anon key; contact_submissions needs the service-role key.)
import { describeEnv } from './env.js';
import { connectDB, FieldNote, ContactSubmission } from './db.js';

const { SUPABASE_URL, SUPABASE_SERVICE_KEY } = process.env;
if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Set SUPABASE_URL and SUPABASE_SERVICE_KEY'); process.exit(1);
}
const get = async (table) => {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=*`, {
    headers: { apikey: SUPABASE_SERVICE_KEY, Authorization: `Bearer ${SUPABASE_SERVICE_KEY}` },
  });
  if (!r.ok) throw new Error(`${table}: ${r.status} ${await r.text()}`);
  return r.json();
};

await connectDB();
for (const [table, Model] of [['field_notes', FieldNote], ['contact_submissions', ContactSubmission]]) {
  const rows = await get(table);
  for (const { id, ...rest } of rows) {
    await Model.updateOne({ _id: id }, { $setOnInsert: { _id: id, ...rest } }, { upsert: true });
  }
  console.log(`${table}: ${rows.length} rows copied`);
}
process.exit(0);
