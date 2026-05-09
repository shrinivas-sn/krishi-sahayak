import { NextResponse } from 'next/server';
import { getDelayedComplaints, markComplaintEscalated, getAuthoritiesByDepartment, getSocialEscalatedComplaints, markComplaintSocialEscalated } from '@/lib/db';
import { sendSMS } from '@/lib/sms';

function matchDepartment(issueType: string): string {
  if (issueType.includes('Irrigation')) return 'Irrigation';
  if (issueType.includes('Crop') || issueType.includes('Agriculture')) return 'Agriculture';
  if (issueType.includes('Seed') || issueType.includes('Subsidies')) return 'Subsidies';
  if (issueType.includes('Electricity')) return 'Electricity';
  return 'General Admin';
}

export async function GET() {
  try {
    const delayedComplaints = await getDelayedComplaints();
    let escalatedCount = 0;

    for (const complaint of delayedComplaints) {
      const targetDept = matchDepartment(complaint.issueType);
      let authorities = await getAuthoritiesByDepartment(targetDept);
      
      if (authorities.length === 0) {
        authorities = await getAuthoritiesByDepartment('General Admin');
      }
      
      if (authorities.length === 0) {
        // If no authority exists yet, we skip and leave escalated=0 so they get notified when they register
        continue; 
      }

      for (const auth of authorities) {
        const message = `URGENT: Complaint ID #${complaint.id} from ${complaint.farmerName || 'a Farmer'} regarding "${complaint.issueType}" has been delayed for over 2 days. Please intervene.`;
        sendSMS(auth.phone, message);
      }

      await markComplaintEscalated(complaint.id!);
      escalatedCount++;
    }

    const socialDelayedComplaints = await getSocialEscalatedComplaints();
    let socialEscalatedCount = 0;

    for (const complaint of socialDelayedComplaints) {
      if (complaint.id) {
        await markComplaintSocialEscalated(complaint.id);
        socialEscalatedCount++;
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `Escalated ${escalatedCount} delayed complaints. Social escalated ${socialEscalatedCount} complaints.` 
    });
  } catch (error: any) {
    console.error('Escalation error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
