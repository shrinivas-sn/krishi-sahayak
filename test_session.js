const db = require('better-sqlite3')('complaints.db');
const token = 'b769a5f7-7de5-4614-99d9-7661df26f50e';
const session = db.prepare('SELECT * FROM sessions WHERE token = ? AND expiresAt > datetime("now")').get(token);
console.log('Session returned:', session);

const now = db.prepare('SELECT datetime("now") as now').get();
console.log('Now:', now);
