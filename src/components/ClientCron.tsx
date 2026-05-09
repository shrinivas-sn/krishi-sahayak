'use client';

import { useEffect } from 'react';

export default function ClientCron() {
  useEffect(() => {
    // Poll the escalation API every 1 minute
    const interval = setInterval(() => {
      fetch('/api/cron/escalate').catch(console.error);
    }, 60000);
    
    // Also trigger it once on load
    fetch('/api/cron/escalate').catch(console.error);

    return () => clearInterval(interval);
  }, []);

  return null;
}
