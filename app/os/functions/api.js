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

export async function submitContactForm({name,email,message}){
    try{
        const response = await fetch(`${BASE_URL}/api/contact-form`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message }),
        });

        if (!response.ok) {
            throw new Error('Failed to submit contact form');
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error('Error submitting contact form:', error);
        return { success: false, error: error.message };
    }
}