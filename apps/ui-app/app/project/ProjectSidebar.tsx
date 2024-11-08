'use client';

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from '@shared/ui';
import ProjectAdd from './ProjectAdd';
import ProjectList from './ProjectList';
import RootSidebar from 'apps/ui-app/layouts/RooterSidebar';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function ProjectSidebar() {
	const pathname = usePathname();

	const isSignInOrSignUp = pathname.includes('signin') || pathname.includes('signup');

	if (isSignInOrSignUp) {
		return null;
	}
	const item = {
		name: 'Project',
		url: '/project/',
		emoji: '👕'
	};
	return (
		<Sidebar collapsible="icon">
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Workspaces</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Link href={item.url} title={item.name}>
										<span>{item.emoji}</span>
										<span>{item.name}</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				{/* <RootSidebar /> */}
				{/* <nav className="secondary-sidebar">
					<UserSection />
					<section className="side-nav">
						<div className="side-title">
							<span>Projects</span>
							<ProjectAdd />
						</div>
						<ProjectList />
					</section>
				</nav> */}
			</SidebarContent>
		</Sidebar>
	);
}
