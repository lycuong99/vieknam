'use client';

import {
	Sidebar,
	SidebarContent, SidebarHeader, SidebarRail
} from '@shared/ui';
import { usePathname } from 'next/navigation';
import OrganizationSwitcher from 'apps/ui-app/app/[orgId]/OrganizationSwitcher';
import { NavWorkwpace } from 'apps/ui-app/app/[orgId]/NavWorkspace';

export default function ProjectSidebar() {
	const pathname = usePathname();

	const isSignInOrSignUp = pathname.includes('signin') || pathname.includes('signup');

	if (isSignInOrSignUp) {
		return null;
	}

	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<OrganizationSwitcher />
			</SidebarHeader>
			<SidebarContent>
				<NavWorkwpace />
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}
