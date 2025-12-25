const API_BASE_URL = 'http://localhost:8000/api/v1';

export async function fetchProjects() {
    const res = await fetch(`${API_BASE_URL}/projects/`, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch projects');
    }
    return res.json();
}

export async function fetchProject(id: string) {
    // Since our API uses UUIDs but frontend might use slugs or we need to filter,
    // for now we'll fetch all and find (not efficient but works for small data).
    // Ideally, API should support lookup by slug or ID.
    // Let's assume the ID passed is the UUID from the list.
    const res = await fetch(`${API_BASE_URL}/projects/${id}/`, { cache: 'no-store' });
    if (!res.ok) {
        // Fallback: Fetch all and find by ID if the direct endpoint fails (e.g. if ID is actually a slug)
        const projects = await fetchProjects();
        const project = projects.find((p: any) => p.id === id);
        if (project) return project;

        throw new Error('Failed to fetch project');
    }
    return res.json();
}
