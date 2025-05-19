import { closeDb } from '@/lib/db';

// This can be imported in API routes that need to ensure DB cleanup
export async function ensureDbCleanup(req, res) {
  // Register a listener for when the connection is closed
  res.on('close', async () => {
    try {
      await closeDb();
    } catch (error) {
      console.error('Error during DB cleanup:', error);
    }
  });
}
