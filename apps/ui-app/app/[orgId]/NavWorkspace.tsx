import { Project } from '@prisma/client';
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from '@shared/ui';
import ProjectAdd from 'apps/ui-app/app/[orgId]/ProjectAdd';
import Link from 'next/link';
import { HiOutlinePlusSm } from 'react-icons/hi';

export function NavWorkwpace() {
	const projects: Partial<Project>[] = [
		{
			id: 'asas',
			name: 'Project 1',
			iconn: '',
			organizationId: 'asas'
		},
		{
			id: 'aswe',
			name: 'Project 2',
			iconn: '',
			organizationId: 'asas'
		}
	];
	return (
		<SidebarGroup>
			<SidebarGroupLabel>Workspaces</SidebarGroupLabel>
			<SidebarGroupContent>
				<SidebarMenu>
					{projects.map(project => {
						return (
							<SidebarMenuItem key={project.id}>
								<SidebarMenuButton asChild>
									<Link href={`/${project.organizationId}/${project.id}`} title={project.name}>
										<span>{project.iconn}</span>
										<span>{project.name}</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						);
					})}

					<SidebarMenuItem>
						<ProjectAdd>
							<SidebarMenuButton>
								<HiOutlinePlusSm /> Add projects
							</SidebarMenuButton>
						</ProjectAdd>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
