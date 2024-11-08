'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Project } from '@prisma/client';
import { useProjectStore } from 'apps/ui-app/store/project';

export default function ProjectList() {
	const { projects, selectProject } = useProjectStore(state => state);

	const params = useParams();

	const onSelectProject = (id: string) => {
		selectProject(id);
	};

	useEffect(() => {
		console.log('get all projects');
		// getProjects().then(res => res.json()).then(result => {
		// 	const { data, status } = result
		// 	const projects = data as Project[]
		//
		// 	if (status !== 200) return;
		//
		// 	addAllProject(data)
		// 	projects.some(p => {
		// 		if (p.id === params.projectId) {
		// 			onSelectProject(p.id)
		// 			return true;
		// 		}
		// 	})
		//
		//
		// })
	}, []);

	return (
		<nav className="nav">
			{projects.map(project => {
				const active = params.projectId === project.id;
				return (
					<Link
						key={project.id}
						className={`${active ? 'active' : ''} nav-item`}
						onClick={() => {
							onSelectProject(project.id);
						}}
						href={`/project/${project.id}`}>
						<span className="nav-icon">👕</span>
						<span>{project.name}</span>
					</Link>
				);
			})}
		</nav>
	);
}
