import { getDb } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const id = params.id;
    const db = await getDb();
    
    const project = await db.get('SELECT * FROM projects WHERE id = ?', [id]);
    
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const formattedProject = {
      ...project,
      tech: JSON.parse(project.tech),
      features: JSON.parse(project.features),
      links: JSON.parse(project.links),
      collaborators: project.collaborators ? JSON.parse(project.collaborators) : undefined
    };
    
    return NextResponse.json(formattedProject);
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const id = params.id;
    const body = await request.json();
    const { title, description, tech, features, links, collaborators } = body;
    
    const db = await getDb();
    
    await db.run(
      `UPDATE projects 
       SET title = ?, description = ?, tech = ?, features = ?, links = ?, collaborators = ?
       WHERE id = ?`,
      [
        title,
        description,
        JSON.stringify(tech),
        JSON.stringify(features),
        JSON.stringify(links),
        collaborators ? JSON.stringify(collaborators) : null,
        id
      ]
    );
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = params.id;
    const db = await getDb();
    
    await db.run('DELETE FROM projects WHERE id = ?', [id]);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
