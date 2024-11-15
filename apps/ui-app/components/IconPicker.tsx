'use client';

import React, { useMemo, useState } from 'react';
import * as HeroIcons from 'react-icons/lu';
import {
	Button,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	Input,
	Popover,
	PopoverContent,
	PopoverTrigger,
	ScrollArea
} from '@shared/ui';

export const IconRenderer = ({
	iconName,
	...rest
}: {
	iconName: string;
} & React.ComponentPropsWithoutRef<'svg'>) => {
	const IconComponent = HeroIcons[iconName as keyof typeof HeroIcons] as React.ComponentType<
		React.ComponentPropsWithoutRef<'svg'>
	>;

	if (!IconComponent) {
		return null;
	}

	return <IconComponent {...rest} />;
};
const LucideIcons = Object.entries(HeroIcons)?.map(([iconName, IconComponent]) => iconName);

const IconPicker = () => {
	const iconNames = useMemo(() => LucideIcons, []);

	const [search, setSearch] = useState('');

	//   memoize the search functionality
	const filteredIcons = useMemo(() => {
		return iconNames.filter(icon => {
			if (search === '') {
				return true;
			} else if (icon.toLowerCase().includes(search.toLowerCase())) {
				return true;
			} else {
				return false;
			}
		});
	}, [iconNames, search]);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline">Edit Profile</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[360px]">
				<div>
					<p>Select an Icon</p>
					<p>Choose an icon for this collection</p>
				</div>
				<div className="">
					<Input placeholder="Search..." type="search" value={search} onChange={e => setSearch(e.target.value)} />
					<ScrollArea className="h-[400px]">
						<div className="grid grid-cols-6 gap-2 py-4 pb-12">
							{filteredIcons?.map(iconName => {
								// const IconComponent = HeroIcons[name as keyof typeof HeroIcons];
								const IconComponent = HeroIcons[iconName as keyof typeof HeroIcons] as React.FC<React.SVGProps<SVGSVGElement>>;

								return (
									<React.Fragment key={iconName}>
										{/* {name} */}
										{iconName && (
											<Button variant="outline" size={'icon'} key={iconName}>
												<IconComponent />
												<span className="sr-only">{iconName}</span>
											</Button>
										)}
									</React.Fragment>
								);
							})}

							{filteredIcons.length === 0 ? (
								<div className="col-span-full flex grow flex-col items-center justify-center gap-2 text-center">
									<span>No icons found...</span>
									<Button onClick={() => setSearch('')}>Clear Search</Button>
								</div>
							) : (
								<div className="pointer-events-auto absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent" />
							)}
						</div>
					</ScrollArea>
				</div>
			</PopoverContent>
		</Popover>
	);
};
export default IconPicker;
