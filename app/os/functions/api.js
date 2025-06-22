const BASE_URL=process.env.NEXT_PUBLIC_BASE_URL;



export async function fetchProjects(){
    try {
        const response = await fetch(`${BASE_URL}/api/projects`, {
        cache: "reload",
        });
    
        if (!response.ok) {
        throw new Error('Failed to fetch projects');
        }
    
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
}