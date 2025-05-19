import { getDb } from '@/lib/db';
import { NextResponse } from 'next/server';

// Get all projects
export async function GET() {
  try {
    const db = await getDb();
    const projects = await db.all('SELECT * FROM projects');
    
    // Parse JSON strings back into objects
    const formattedProjects = projects.map(project => ({
      ...project,
      tech: JSON.parse(project.tech),
      features: JSON.parse(project.features),
      links: JSON.parse(project.links),
      collaborators: project.collaborators ? JSON.parse(project.collaborators) : undefined
    }));
    
    return NextResponse.json(formattedProjects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

// Create new project
export async function POST(request) {
  try {
    const body = await request.json();
    const { title, description, tech, features, links, collaborators } = body;
    
    // Validate required fields
    if (!title || !description || !tech || !features || !links) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const db = await getDb();
    
    // Convert arrays/objects to JSON strings for storage
    const result = await db.run(
      `INSERT INTO projects (title, description, tech, features, links, collaborators)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        title,
        description,
        JSON.stringify(tech),
        JSON.stringify(features),
        JSON.stringify(links),
        collaborators ? JSON.stringify(collaborators) : null
      ]
    );
    
    return NextResponse.json({ id: result.lastID, success: true }, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
