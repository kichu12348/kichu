import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { initialProjects } from './seed-data';

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

export async function seedProjects() {
  console.log('Checking if database needs seeding...');
  const db = await getDb();
  
  // Check if projects table is empty
  const count = await db.get('SELECT COUNT(*) as count FROM projects');
  
  if (count.count > 0) {
    console.log(`Database already contains ${count.count} projects. No seeding needed.`);
    return false;
  }
  
  console.log('Database is empty, seeding with initial projects...');
  let stmt = null;
  
  try {
    // Begin a transaction for better performance
    await db.exec('BEGIN TRANSACTION');
    
    // Insert each project from initialProjects
    stmt = await db.prepare(`
      INSERT INTO projects (title, description, tech, features, links, collaborators)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    
    for (const project of initialProjects) {
      await stmt.run(
        project.title,
        project.description,
        JSON.stringify(project.tech),
        JSON.stringify(project.features),
        JSON.stringify(project.links),
        project.collaborators ? JSON.stringify(project.collaborators) : null
      );
      
      console.log(`Seeded project: ${project.title}`);
    }
    
    // Only finalize the statement once, outside of the loop
    if (stmt) {
      await stmt.finalize();
      stmt = null; // Set to null to indicate it's been finalized
    }
    
    // Commit the transaction
    await db.exec('COMMIT');
    console.log(`Successfully seeded ${initialProjects.length} projects to the database`);
    return true;
    
  } catch (error) {
    // Rollback in case of error
    await db.exec('ROLLBACK');
    console.error('Error seeding data:', error);
    throw error;
  } finally {
    // Only finalize if it wasn't already finalized
    if (stmt) {
      try {
        await stmt.finalize();
      } catch (err) {
        console.error('Error finalizing statement:', err);
      }
    }
  }
}
