'use client';

import { Organization } from '@prisma/client';
import {
	SidebarHeader,
	SidebarMenuButton,
	SidebarMenuItem,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenu,
	DropdownMenuLabel,
	DropdownMenuSeparator
} from '@shared/ui';
import { getOrg } from 'apps/ui-app/services/organization';
import { ChevronsUpDown, GalleryVerticalEnd, Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function OrganizationSwitcher() {
	const { orgId } = useParams();

	const [orgs, setOrgs] = useState<Organization[]>([]);

	const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);

	const { push } = useRouter();

	useEffect(() => {
		getOrg().then(res => {
			const { data, status } = res.data;
			if (status !== 200) {
				return;
			}

			const orgs = data as Organization[];
			if (orgs) {
				setOrgs(data);
				const selectdOrg = orgs.find(org => org.id === orgId);
				if (selectdOrg) {
					setSelectedOrg(selectdOrg);
				} else {
					push('/');
				}
			}
		});
	}, []);

	return (
		<SidebarHeader>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
							<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
								<GalleryVerticalEnd className="size-4" />
							</div>
							<div className="flex flex-col gap-0.5 leading-none">
								<span className="font-semibold">{selectedOrg?.name}</span>
								<span className="text-xs text-gray-500">Organization</span>
							</div>
							<ChevronsUpDown className="ml-auto" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]" align="start">
						<DropdownMenuLabel className="text-xs text-muted-foreground">Switch Organizations</DropdownMenuLabel>
						{orgs
							.filter(org => org.id != orgId)
							.map(org => (
								<DropdownMenuItem
									className="cursor-pointer"
									key={org?.id}
									onSelect={() => {
										push(`/${org.id}`);
									}}>
									{org?.name}
								</DropdownMenuItem>
							))}
						<DropdownMenuItem className="gap-2 p-2">
							<Plus className="size-4" />
							<div className="font-medium text-muted-foreground">Add Organizations</div>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem className="cursor-pointer">Log out</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarHeader>
	);
}
