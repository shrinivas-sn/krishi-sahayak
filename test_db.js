const db = require('better-sqlite3')('complaints.db');
console.log('Farmers:', db.prepare('SELECT * FROM farmers').all());
console.log('Officers:', db.prepare('SELECT * FROM officers').all());
console.log('Sessions:', db.prepare('SELECT * FROM sessions').all());
