'use client';

import TaskCreate from 'apps/ui-app/app/[orgId]/project/[projectId]/TaskCreate';
import { useProjectStore } from 'apps/ui-app/store/project';
import { Calendar1Icon, Cog, UserCircle2Icon, ViewIcon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { HiOutlineMenuAlt1 } from 'react-icons/hi';
import { HiOutlineCog6Tooth, HiOutlineUserCircle, HiOutlineViewColumns, HiOutlineCalendar } from 'react-icons/hi2';

export default function ProjectNav() {
	const { selectedProject } = useProjectStore(state => state);

	const [tabs] = useState([
		{ name: 'Overview', href: '#', icon: HiOutlineUserCircle, current: false },
		{ name: 'Task', href: '#', icon: HiOutlineMenuAlt1, current: false },
		{ name: 'Board', href: '#', icon: HiOutlineViewColumns, current: false },
		{ name: 'Calendar', href: '#', icon: HiOutlineCalendar, current: false },
		{ name: 'Setting', href: '#', icon: HiOutlineCog6Tooth, current: false }
	]);
	const params = useParams();
	const { push } = useRouter();

	const mode = 'overview';

	const onMoveTab = (name: string) => {
		console.log(name);
		push(`/${params.orgId}/project/${params.projectId}?mode=${name.toLowerCase()}`);
	};

	return (
		<div>
			<div className="bg-white border-b border-gray-100 shadow-sm">
				<h2 className="text-xl font-bold px-4 py-2">{params.projectId}</h2>
				<div className="flex justify-between">
					<div className="tab pl-1 flex">
						{tabs.map((tab, index) => {
							const Icon = tab.icon;
							const active = tab.name.toLowerCase() === mode;
							return (
								<div onClick={() => onMoveTab(tab.name)} className={`tab-item ${active ? 'active' : ''}`} key={index}>
									<Icon />
									<span>{tab.name}</span>
								</div>
							);
						})}
					</div>
					<TaskCreate />
				</div>
			</div>

			<div className="task bg-indigo-50/50 w-full"></div>
		</div>
	);
}
