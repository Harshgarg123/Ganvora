import { describeEnv } from './env.js';
import seedNotes from './field-notes.seed.js';
import { connectDB, seedFieldNotes } from './db.js';

await connectDB();
const added = await seedFieldNotes(seedNotes);
console.log(`Seed done, ${added} new note(s) added`);
process.exit(0);
