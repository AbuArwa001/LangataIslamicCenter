const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchProjects() {
    const res = await fetch(`${API_BASE_URL}/projects/`, {
        next: { tags: ['projects'] }
    });
    if (!res.ok) {
        throw new Error('Failed to fetch projects');
    }
    return res.json();
}

export async function fetchProject(id: string) {
    const res = await fetch(`${API_BASE_URL}/projects/${id}/`, {
        next: { tags: ['projects', `project-${id}`] }
    });
    if (!res.ok) {
        const projects = await fetchProjects();
        const project = projects.find((p: any) => p.id === id);
        if (project) return project;

        throw new Error('Failed to fetch project');
    }
    return res.json();
}
