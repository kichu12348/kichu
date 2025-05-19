const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

async function closeAllConnections() {
  try {
    const dbPath = path.join(process.cwd(), 'projects.db');
    console.log(`Closing database at: ${dbPath}`);
    
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });
    
    // Force cleanup
    await db.exec('PRAGMA optimize;');
    
    // Give time for operations to complete
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Close the connection
    await db.close();
    console.log('Successfully closed database');
    process.exit(0);
  } catch (error) {
    console.error('Error closing database:', error);
    process.exit(1);
  }
}

closeAllConnections();
