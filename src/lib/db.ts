import { createClient } from '@libsql/client';

const db = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

// Initialize tables on first run
async function initDb() {
  await db.executeMultiple(`
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
      videoPath TEXT,
      location TEXT,
      status TEXT DEFAULT 'Pending',
      escalated INTEGER DEFAULT 0,
      socialEscalated INTEGER DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(farmerId) REFERENCES farmers(id)
    );
  `);
}

// Run init (safe because of IF NOT EXISTS)
initDb().catch(console.error);

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

export async function insertFarmer(farmer: Farmer): Promise<number | bigint> {
  const result = await db.execute({
    sql: `INSERT INTO farmers (name, phone, passwordHash, documentPath) VALUES (?, ?, ?, ?)`,
    args: [farmer.name, farmer.phone, farmer.passwordHash, farmer.documentPath],
  });
  return result.lastInsertRowid!;
}

export async function getFarmerByPhone(phone: string): Promise<Farmer | undefined> {
  const result = await db.execute({
    sql: 'SELECT * FROM farmers WHERE phone = ?',
    args: [phone],
  });
  return result.rows[0] as unknown as Farmer | undefined;
}

export async function updateFarmerSocials(id: number, twitterU?: string, twitterP?: string, fbU?: string, fbP?: string) {
  await db.execute({
    sql: `UPDATE farmers SET twitterUsername = ?, twitterPassword = ?, facebookUsername = ?, facebookPassword = ? WHERE id = ?`,
    args: [twitterU || null, twitterP || null, fbU || null, fbP || null, id],
  });
}

export async function getFarmerById(id: number): Promise<Farmer | undefined> {
  const result = await db.execute({
    sql: 'SELECT * FROM farmers WHERE id = ?',
    args: [id],
  });
  return result.rows[0] as unknown as Farmer | undefined;
}

export async function insertOfficer(officer: Officer): Promise<number | bigint> {
  const result = await db.execute({
    sql: `INSERT INTO officers (name, officerId, passwordHash, department, documentPath) VALUES (?, ?, ?, ?, ?)`,
    args: [officer.name, officer.officerId, officer.passwordHash, officer.department, officer.documentPath],
  });
  return result.lastInsertRowid!;
}

export async function getOfficerByOfficerId(officerId: string): Promise<Officer | undefined> {
  const result = await db.execute({
    sql: 'SELECT * FROM officers WHERE officerId = ?',
    args: [officerId],
  });
  return result.rows[0] as unknown as Officer | undefined;
}

export async function getOfficerById(id: number): Promise<Officer | undefined> {
  const result = await db.execute({
    sql: 'SELECT * FROM officers WHERE id = ?',
    args: [id],
  });
  return result.rows[0] as unknown as Officer | undefined;
}

export async function insertAuthority(authority: HigherAuthority): Promise<number | bigint> {
  const result = await db.execute({
    sql: `INSERT INTO higher_authorities (name, phone, passwordHash, department) VALUES (?, ?, ?, ?)`,
    args: [authority.name, authority.phone, authority.passwordHash, authority.department],
  });
  return result.lastInsertRowid!;
}

export async function getAuthorityByPhone(phone: string): Promise<HigherAuthority | undefined> {
  const result = await db.execute({
    sql: 'SELECT * FROM higher_authorities WHERE phone = ?',
    args: [phone],
  });
  return result.rows[0] as unknown as HigherAuthority | undefined;
}

export async function getAuthorityById(id: number): Promise<HigherAuthority | undefined> {
  const result = await db.execute({
    sql: 'SELECT * FROM higher_authorities WHERE id = ?',
    args: [id],
  });
  return result.rows[0] as unknown as HigherAuthority | undefined;
}

export async function getAuthoritiesByDepartment(department: string): Promise<HigherAuthority[]> {
  const result = await db.execute({
    sql: 'SELECT * FROM higher_authorities WHERE department = ?',
    args: [department],
  });
  return result.rows as unknown as HigherAuthority[];
}

export async function createSession(session: Session) {
  await db.execute({
    sql: `INSERT INTO sessions (token, userId, userType, expiresAt) VALUES (?, ?, ?, ?)`,
    args: [session.token, session.userId, session.userType, session.expiresAt],
  });
}

export async function getSession(token: string): Promise<Session | undefined> {
  const result = await db.execute({
    sql: `SELECT * FROM sessions WHERE token = ? AND expiresAt > datetime('now')`,
    args: [token],
  });
  return result.rows[0] as unknown as Session | undefined;
}

export async function deleteSession(token: string) {
  await db.execute({
    sql: 'DELETE FROM sessions WHERE token = ?',
    args: [token],
  });
}

export async function getComplaints(): Promise<Complaint[]> {
  const result = await db.execute({
    sql: `SELECT c.*, f.name as farmerName FROM complaints_v2 c JOIN farmers f ON c.farmerId = f.id ORDER BY c.createdAt DESC`,
    args: [],
  });
  return result.rows as unknown as Complaint[];
}

export async function getComplaintsByFarmer(farmerId: number): Promise<Complaint[]> {
  const result = await db.execute({
    sql: `SELECT c.*, f.name as farmerName FROM complaints_v2 c JOIN farmers f ON c.farmerId = f.id WHERE c.farmerId = ? ORDER BY c.createdAt DESC`,
    args: [farmerId],
  });
  return result.rows as unknown as Complaint[];
}

export async function getDelayedComplaints(): Promise<Complaint[]> {
  const result = await db.execute({
    sql: `SELECT c.*, f.name as farmerName FROM complaints_v2 c JOIN farmers f ON c.farmerId = f.id WHERE c.status != 'Resolved' AND c.escalated = 0 AND c.createdAt < datetime('now', '-2 minutes')`,
    args: [],
  });
  return result.rows as unknown as Complaint[];
}

export async function getSocialEscalatedComplaints(): Promise<Complaint[]> {
  const result = await db.execute({
    sql: `SELECT * FROM complaints_v2 WHERE status != 'Resolved' AND socialEscalated = 0 AND createdAt < datetime('now', '-5 minutes')`,
    args: [],
  });
  return result.rows as unknown as Complaint[];
}

export async function markComplaintEscalated(id: number) {
  await db.execute({
    sql: 'UPDATE complaints_v2 SET escalated = 1 WHERE id = ?',
    args: [id],
  });
}

export async function markComplaintSocialEscalated(id: number) {
  await db.execute({
    sql: 'UPDATE complaints_v2 SET socialEscalated = 1 WHERE id = ?',
    args: [id],
  });
}

export async function insertComplaint(complaint: Complaint): Promise<number | bigint> {
  const result = await db.execute({
    sql: `INSERT INTO complaints_v2 (farmerId, issueType, description, imagePath, videoPath, location) VALUES (?, ?, ?, ?, ?, ?)`,
    args: [
      complaint.farmerId,
      complaint.issueType,
      complaint.description,
      complaint.imagePath,
      complaint.videoPath || null,
      complaint.location || null,
    ],
  });
  return result.lastInsertRowid!;
}

export async function updateComplaintStatus(id: number, status: string) {
  await db.execute({
    sql: 'UPDATE complaints_v2 SET status = ? WHERE id = ?',
    args: [status, id],
  });
}
