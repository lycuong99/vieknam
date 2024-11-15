import { Project } from '@prisma/client';
import { produce } from 'immer';
import { create } from 'zustand';

interface ProjectState {
	selectedProject: Project | null;
	projects: Project[];
	addProject: (project: Project) => void;
	selectProject: (id: string) => void;
}
export const useProjectStore = create<ProjectState>(set => ({
	selectedProject: null,
	projects: [],
	addProject: (project: Project) =>
		set(
			produce((state: ProjectState) => {
				state.projects.push(project);
			})
		),
	addAddProject: (projects: Project[]) => {
		set(
			produce((state: ProjectState) => {
				state.projects = projects;
			})
		);
	},
	selectProject: (id: string) =>
		set(
			produce((state: ProjectState) => {
				const project = state.projects.find(p => p.id === id);

				if (project) {
					state.selectedProject = project;
				}
			})
		)
}));
