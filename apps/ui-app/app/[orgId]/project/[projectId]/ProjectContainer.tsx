'use client';

import { useProjectStore } from 'apps/ui-app/store/project';
import { Calendar1Icon, Cog, UserCircle2Icon, ViewIcon } from 'lucide-react';
import { useState } from 'react';

export default function ProjectContainer() {
	const { selectedProject } = useProjectStore(state => state);

	const [tabs] = useState([
		{ name: 'Overview', href: '#', icon: UserCircle2Icon, current: false },
		{ name: 'Board', href: '#', icon: ViewIcon, current: false },
		{ name: 'Calendar', href: '#', icon: Calendar1Icon, current: false },
		{ name: 'Setting', href: '#', icon: Cog, current: false }
	]);

	const mode = 'overview';

	const onMoveTab = (name: string) => {
		console.log(name);
	};

	return (
		<div>
			<div className="bg-white border-b border-gray-100 shadow-sm">
				<h2 className="text-xl font-bold px-4 py-2">{selectedProject?.name}</h2>
				<div className="tab pl-1">
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
			</div>

			<div className="task bg-indigo-50/50 w-full"></div>
		</div>
	);
}
