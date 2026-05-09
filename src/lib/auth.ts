import { cookies } from 'next/headers';
import { getSession, getFarmerById, getOfficerById, getAuthorityById } from './db';

export async function getUserFromSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session_token')?.value;

  if (!token) return null;

  const session = getSession(token);
  if (!session) return null;

  if (session.userType === 'farmer') {
    const farmer = getFarmerById(session.userId);
    if (!farmer) return null;
    const { passwordHash, ...safeFarmer } = farmer;
    return { ...safeFarmer, userType: 'farmer' };
  } else if (session.userType === 'officer') {
    const officer = getOfficerById(session.userId);
    if (!officer) return null;
    const { passwordHash, ...safeOfficer } = officer;
    return { ...safeOfficer, userType: 'officer' };
  } else if (session.userType === 'authority') {
    const authority = getAuthorityById(session.userId);
    if (!authority) return null;
    const { passwordHash, ...safeAuthority } = authority;
    return { ...safeAuthority, userType: 'authority' };
  }
  return null;
}
