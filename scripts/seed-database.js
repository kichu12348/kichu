const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const fs = require('fs');
const path = require('path');

// Load the initial projects data
const seedDataPath = path.join(__dirname, '..', 'lib', 'seed-data.js');
const seedDataContent = fs.readFileSync(seedDataPath, 'utf8');
const initialProjectsMatch = seedDataContent.match(/export const initialProjects = (\[[\s\S]*?\]);/);

if (!initialProjectsMatch) {
  console.error('Could not extract initialProjects from seed-data.js');
  process.exit(1);
}

// Convert the string representation to actual JavaScript object
// Note: This is a simple approach and might not handle all edge cases
const initialProjectsStr = initialProjectsMatch[1];
const initialProjects = eval(initialProjectsStr);

async function migrateProjects() {
  console.log('Starting database migration...');
  
  // Open the database
  const db = await open({
    filename: './projects.db',
    driver: sqlite3.Database
  });
  
  console.log('Connected to database');
  let stmt = null;
  
  try {
    // Create the projects table if it doesn't exist
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
    
    console.log('Created projects table');
    
    // Check if data already exists to avoid duplicates
    const count = await db.get('SELECT COUNT(*) as count FROM projects');
    
    if (count.count > 0) {
      console.log(`Database already contains ${count.count} projects. Skipping seeding to avoid duplicates.`);
      console.log('If you want to reseed, please delete the existing data first.');
      return;
    }
    
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
      
      console.log(`Migrated project: ${project.title}`);
    }
    
    // Finalize the prepared statement
    await stmt.finalize();
    stmt = null;
    
    // Commit the transaction
    await db.exec('COMMIT');
    console.log(`Successfully migrated ${initialProjects.length} projects to the database`);
    
  } catch (error) {
    // Rollback in case of error
    await db.exec('ROLLBACK');
    console.error('Error migrating data:', error);
  } finally {
    // Ensure statement is finalized
    if (stmt) {
      try {
        await stmt.finalize();
      } catch (err) {
        console.error('Error finalizing statement:', err);
      }
    }
    
    // Close the database connection with a timeout to ensure everything is processed
    setTimeout(async () => {
      try {
        await db.close();
        console.log('Database connection closed');
      } catch (err) {
        console.error('Error closing database:', err);
      }
    }, 500);
  }
}

// Run the migration function
migrateProjects().catch(console.error);
