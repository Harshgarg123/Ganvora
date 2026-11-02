// npm run check-db  -> tests the Atlas connection and prints a clear diagnosis
import { describeEnv } from './env.js';
import { connectDB, describeUri, resolveUri } from './db.js';
const uri = resolveUri();
console.log('Environment check:\n  ' + describeEnv());
console.log('Using:', describeUri(uri || ''));
try {
  const c = await connectDB(uri);
  console.log('SUCCESS: connected to database "' + c.name + '"');
  process.exit(0);
} catch (e) {
  console.log('FAILED:', e.message);
  if (/bad auth|authentication failed/i.test(e.message)) console.log('-> Wrong username/password. Reset the password in Atlas > Database Access, use letters+numbers only, update .env.');
  else if (/ENOTFOUND|querySrv|ECONNREFUSED/i.test(e.message)) console.log('-> Cluster host/DNS problem. Re-copy the host from Atlas > Connect > Drivers.');
  else if (/timed out|ReplicaSetNoPrimary|Server selection/i.test(e.message)) console.log('-> Network blocked. Atlas > Network Access > add 0.0.0.0/0.');
  process.exit(1);
}
