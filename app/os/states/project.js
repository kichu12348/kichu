import { create } from "../store/store";
import { fetchProjects } from "../functions/api";

const projectStore = create((set) => ({
    projects: [],
    init: async () => {
        const projects = await fetchProjects();
        set({ projects });
    },
}));

export default projectStore;