import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

let db = null;
let isClosing = false;

export async function getDb() {
  if (isClosing) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    isClosing = false;
  }
  
  if (!db) {
    const dbPath = path.join(process.cwd(), 'projects.db');
    console.log(`Opening database at: ${dbPath}`);

    if (process.env.NODE_ENV !== 'production') {
      sqlite3.verbose();
    }
    
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });
    
    await db.exec('PRAGMA journal_mode = WAL;');
    await db.exec('PRAGMA synchronous = NORMAL;');

    await db.exec(`
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        tech TEXT NOT NULL,
        features TEXT NOT NULL,
        links TEXT NOT NULL,
        collaborators TEXT
      )
    `);
  }
  
  return db;
}

export async function closeDb() {
  if (db && !isClosing) {
    isClosing = true;
    try {
      await db.exec('PRAGMA optimize;');
      await new Promise(resolve => setTimeout(resolve, 500));
      await db.close();
      db = null;
      isClosing = false;
      console.log('Database connection closed successfully');
    } catch (error) {
      isClosing = false;
      console.error('Error closing database:', error);
      throw error;
    }
  }
}
