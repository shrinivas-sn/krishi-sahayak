import Database from 'better-sqlite3';
import path from 'path';

export interface Farmer {
  id?: number;
  name: string;
  phone: string;
  passwordHash: string;
  documentPath: string | null;
  twitterUsername?: string | null;
  twitterPassword?: string | null;
  facebookUsername?: string | null;
  facebookPassword?: string | null;
  createdAt?: string;
}

export interface Officer {
  id?: number;
  name: string;
  officerId: string;
  passwordHash: string;
  department: string;
  documentPath: string | null;
  isVerified?: number;
  createdAt?: string;
}

export interface HigherAuthority {
  id?: number;
  name: string;
  phone: string;
  passwordHash: string;
  department: string;
  createdAt?: string;
}

export interface Session {
  id?: number;
  token: string;
  userId: number;
  userType: 'farmer' | 'officer' | 'authority';
  expiresAt: string;
}

export interface Complaint {
  id?: number;
  farmerId: number;
  farmerName?: string;
  issueType: string;
  description: string;
  imagePath: string | null;
  videoPath?: string | null;
  location?: string;
  status?: string;
  escalated?: number;
  socialEscalated?: number;
  createdAt?: string;
}

const dbPath = path.resolve(process.cwd(), 'complaints.db');

// @ts-ignore
const db = global.db || new Database(dbPath);
// @ts-ignore
if (process.env.NODE_ENV !== 'production') global.db = db;

db.exec(`
  CREATE TABLE IF NOT EXISTS farmers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL UNIQUE,
    passwordHash TEXT NOT NULL,
    documentPath TEXT,
    twitterUsername TEXT,
    twitterPassword TEXT,
    facebookUsername TEXT,
    facebookPassword TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS officers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    officerId TEXT NOT NULL UNIQUE,
    passwordHash TEXT NOT NULL,
    department TEXT NOT NULL,
    documentPath TEXT,
    isVerified INTEGER DEFAULT 1,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS higher_authorities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL UNIQUE,
    passwordHash TEXT NOT NULL,
    department TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    token TEXT NOT NULL UNIQUE,
    userId INTEGER NOT NULL,
    userType TEXT NOT NULL,
    expiresAt DATETIME NOT NULL
  );

  CREATE TABLE IF NOT EXISTS complaints_v2 (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    farmerId INTEGER NOT NULL,
    issueType TEXT NOT NULL,
    description TEXT NOT NULL,
    imagePath TEXT,
    location TEXT,
    status TEXT DEFAULT 'Pending',
    escalated INTEGER DEFAULT 0,
    socialEscalated INTEGER DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(farmerId) REFERENCES farmers(id)
  );
`);

try {
  db.exec('ALTER TABLE complaints_v2 ADD COLUMN escalated INTEGER DEFAULT 0;');
} catch (e) {}

try {
  db.exec('ALTER TABLE complaints_v2 ADD COLUMN location TEXT;');
} catch (e) {}

try {
  db.exec('ALTER TABLE complaints_v2 ADD COLUMN videoPath TEXT;');
} catch (e) {}

try {
  db.exec('ALTER TABLE complaints_v2 ADD COLUMN socialEscalated INTEGER DEFAULT 0;');
} catch (e) {}

try {
  db.exec('ALTER TABLE farmers ADD COLUMN twitterUsername TEXT;');
  db.exec('ALTER TABLE farmers ADD COLUMN twitterPassword TEXT;');
  db.exec('ALTER TABLE farmers ADD COLUMN facebookUsername TEXT;');
  db.exec('ALTER TABLE farmers ADD COLUMN facebookPassword TEXT;');
} catch (e) {}

export function insertFarmer(farmer: Farmer): number | bigint {
  const stmt = db.prepare(`
    INSERT INTO farmers (name, phone, passwordHash, documentPath)
    VALUES (@name, @phone, @passwordHash, @documentPath)
  `);
  const result = stmt.run(farmer);
  return result.lastInsertRowid;
}

export function getFarmerByPhone(phone: string): Farmer | undefined {
  const stmt = db.prepare('SELECT * FROM farmers WHERE phone = ?');
  return stmt.get(phone) as Farmer | undefined;
}

export function updateFarmerSocials(id: number, twitterU?: string, twitterP?: string, fbU?: string, fbP?: string) {
  const stmt = db.prepare(`
    UPDATE farmers 
    SET twitterUsername = ?, twitterPassword = ?, facebookUsername = ?, facebookPassword = ?
    WHERE id = ?
  `);
  stmt.run(twitterU || null, twitterP || null, fbU || null, fbP || null, id);
}

export function getFarmerById(id: number): Farmer | undefined {
  const stmt = db.prepare('SELECT * FROM farmers WHERE id = ?');
  return stmt.get(id) as Farmer | undefined;
}

export function insertOfficer(officer: Officer): number | bigint {
  const stmt = db.prepare(`
    INSERT INTO officers (name, officerId, passwordHash, department, documentPath)
    VALUES (@name, @officerId, @passwordHash, @department, @documentPath)
  `);
  const result = stmt.run(officer);
  return result.lastInsertRowid;
}

export function getOfficerByOfficerId(officerId: string): Officer | undefined {
  const stmt = db.prepare('SELECT * FROM officers WHERE officerId = ?');
  return stmt.get(officerId) as Officer | undefined;
}

export function getOfficerById(id: number): Officer | undefined {
  const stmt = db.prepare('SELECT * FROM officers WHERE id = ?');
  return stmt.get(id) as Officer | undefined;
}

export function insertAuthority(authority: HigherAuthority): number | bigint {
  const stmt = db.prepare(`
    INSERT INTO higher_authorities (name, phone, passwordHash, department)
    VALUES (@name, @phone, @passwordHash, @department)
  `);
  const result = stmt.run(authority);
  return result.lastInsertRowid;
}

export function getAuthorityByPhone(phone: string): HigherAuthority | undefined {
  const stmt = db.prepare('SELECT * FROM higher_authorities WHERE phone = ?');
  return stmt.get(phone) as HigherAuthority | undefined;
}

export function getAuthorityById(id: number): HigherAuthority | undefined {
  const stmt = db.prepare('SELECT * FROM higher_authorities WHERE id = ?');
  return stmt.get(id) as HigherAuthority | undefined;
}

export function getAuthoritiesByDepartment(department: string): HigherAuthority[] {
  const stmt = db.prepare('SELECT * FROM higher_authorities WHERE department = ?');
  return stmt.all(department) as HigherAuthority[];
}

export function createSession(session: Session) {
  const stmt = db.prepare(`
    INSERT INTO sessions (token, userId, userType, expiresAt)
    VALUES (@token, @userId, @userType, @expiresAt)
  `);
  stmt.run(session);
}

export function getSession(token: string): Session | undefined {
  const stmt = db.prepare('SELECT * FROM sessions WHERE token = ? AND expiresAt > datetime(\'now\')');
  return stmt.get(token) as Session | undefined;
}

export function deleteSession(token: string) {
  const stmt = db.prepare('DELETE FROM sessions WHERE token = ?');
  stmt.run(token);
}

export function getComplaints(): Complaint[] {
  const stmt = db.prepare(`
    SELECT c.*, f.name as farmerName 
    FROM complaints_v2 c
    JOIN farmers f ON c.farmerId = f.id
    ORDER BY c.createdAt DESC
  `);
  return stmt.all() as Complaint[];
}

export function getComplaintsByFarmer(farmerId: number): Complaint[] {
  const stmt = db.prepare(`
    SELECT c.*, f.name as farmerName 
    FROM complaints_v2 c
    JOIN farmers f ON c.farmerId = f.id
    WHERE c.farmerId = ?
    ORDER BY c.createdAt DESC
  `);
  return stmt.all(farmerId) as Complaint[];
}

export function getDelayedComplaints(): Complaint[] {
  const stmt = db.prepare(`
    SELECT c.*, f.name as farmerName 
    FROM complaints_v2 c
    JOIN farmers f ON c.farmerId = f.id
    WHERE c.status != 'Resolved' 
      AND c.escalated = 0 
      AND c.createdAt < datetime('now', '-2 minutes')
  `);
  return stmt.all() as Complaint[];
}

export function getSocialEscalatedComplaints(): Complaint[] {
  const stmt = db.prepare(`
    SELECT * FROM complaints_v2 
    WHERE status != 'Resolved' 
      AND socialEscalated = 0 
      AND createdAt < datetime('now', '-5 minutes')
  `);
  return stmt.all() as Complaint[];
}

export function markComplaintEscalated(id: number) {
  const stmt = db.prepare('UPDATE complaints_v2 SET escalated = 1 WHERE id = ?');
  stmt.run(id);
}

export function markComplaintSocialEscalated(id: number) {
  const stmt = db.prepare('UPDATE complaints_v2 SET socialEscalated = 1 WHERE id = ?');
  stmt.run(id);
}

export function insertComplaint(complaint: Complaint): number | bigint {
  const stmt = db.prepare(`
    INSERT INTO complaints_v2 (farmerId, issueType, description, imagePath, videoPath, location)
    VALUES (@farmerId, @issueType, @description, @imagePath, @videoPath, @location)
  `);
  const result = stmt.run({
    farmerId: complaint.farmerId,
    issueType: complaint.issueType,
    description: complaint.description,
    imagePath: complaint.imagePath,
    videoPath: complaint.videoPath || null,
    location: complaint.location || null
  });
  return result.lastInsertRowid;
}

export function updateComplaintStatus(id: number, status: string) {
  const stmt = db.prepare('UPDATE complaints_v2 SET status = @status WHERE id = @id');
  stmt.run({ id, status });
}
