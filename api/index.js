// Vercel serverless entry: every /api/* request is rewritten here (see vercel.json).
import { createApp } from '../server/index.js';

const app = createApp();
export default app;
