'use client';

import React, { useEffect, useMemo, useState } from 'react';
import * as HeroIcons from 'react-icons/lu';
import {
	Button,
	Input,
	Popover,
	PopoverContent,
	PopoverTrigger,
	ScrollArea,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from '@shared/ui';
import { HiOutlinePlusSm } from 'react-icons/hi';
import { Shuffle } from 'lucide-react';
import data, { Emoji, EmojiMartData } from '@emoji-mart/data';
import { init, SearchIndex } from 'emoji-mart';
init({ data });
const emojiData = data as EmojiMartData;

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

interface IconPickerProps {
	modal?: boolean;
	onIconChange?: (iconName: string) => void;
}
type Icon = {
	type: 'icon';
	name: string;
};

type EmojiIcon = {
	type: 'emoji';
	name: string;
	emoji: string;
};

type IconEmoji = Icon | EmojiIcon;

async function searchEmojiFromData(value: string) {
	console.log('search', value);

	const emojis = await SearchIndex.search(value);
	console.log('search 1', value, emojis);

	const results = emojis?.map((emoji: Emoji) => {
		return emoji.skins[0].native;
	});

	return emojis;
}

const IconPicker = ({ modal, onIconChange }: IconPickerProps) => {
	const iconNames = useMemo(() => LucideIcons, []);

	const [search, setSearch] = useState('');
	const [selectedIcon, setSelectedIcon] = useState<null | IconEmoji>(null);

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

	const [searchEmoji, setSearchEmoji] = useState('');
	const [filteredEmojis, setFilteredEmojis] = useState<Emoji[]>([]);

	const filteredEmojisSet = useMemo(() => {
		if (!filteredEmojis || filteredEmojis.length === 0) {
			return new Set();
		}
		return new Set(filteredEmojis.map(emoji => emoji.id));
	}, [filteredEmojis]);

	useEffect(() => {
		searchEmojiFromData(searchEmoji).then(results => {
			setFilteredEmojis(results);
			console.log(results);
		});
	}, [searchEmoji]);

	return (
		<Popover modal={modal === undefined ? true : modal}>
			<PopoverTrigger asChild>
				<Button type="button" size={'icon'} variant={'outline'} className="">
					{selectedIcon ? (
						selectedIcon.type === 'icon' ? (
							<IconRenderer iconName={selectedIcon.name} />
						) : (
							selectedIcon.emoji
						)
					) : (
						<HiOutlinePlusSm />
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[320px]" align="start">
				<Tabs defaultValue="icon" className="w-full">
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger value="icon">Icon</TabsTrigger>
						<TabsTrigger value="emoji">Emoji</TabsTrigger>
					</TabsList>
					<TabsContent value="icon">
						<div className="">
							<div className="flex gap-2">
								<Input placeholder="Search..." type="search" value={search} onChange={e => setSearch(e.target.value)} />
								<Button
									variant="outline"
									size={'icon'}
									className="aspect-square h-9 w-9"
									onClick={() => {
										setSelectedIcon({
											type: 'icon',
											name: iconNames[Math.floor(Math.random() * iconNames.length)]
										});
									}}>
									<Shuffle className="w-4 h-4" />
								</Button>
							</div>
							<ScrollArea className="h-[400px] py-4 mr-[-16px] pr-4 ">
								<div className="grid grid-cols-8 gap-2 pt-2 pb-12 ">
									{filteredIcons?.map(iconName => {
										// const IconComponent = HeroIcons[name as keyof typeof HeroIcons];
										const IconComponent = HeroIcons[iconName as keyof typeof HeroIcons] as React.FC<
											React.SVGProps<SVGSVGElement>
										>;

										return (
											<React.Fragment key={iconName}>
												{/* {name} */}
												{iconName && (
													<Button
														variant="outline"
														size={'icon'}
														className="w-7 h-7"
														key={iconName}
														onClick={() =>
															setSelectedIcon({
																type: 'icon',
																name: iconName
															})
														}>
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
					</TabsContent>
					<TabsContent value="emoji">
						<div className="">
							<div className="flex gap-2">
								<Input placeholder="Search..." type="search" value={searchEmoji} onChange={e => setSearchEmoji(e.target.value)} />
								<Button
									variant="outline"
									size={'icon'}
									className="aspect-square h-9 w-9"
									onClick={() => {
										const categoriesLength = emojiData.categories.length;
										const randomCategoryIndex = Math.floor(Math.random() * categoriesLength);
										const randomCategory = emojiData.categories[randomCategoryIndex];
										const randomEmojiIndex = Math.floor(Math.random() * randomCategory.emojis.length);
										const randomEmoji = randomCategory.emojis[randomEmojiIndex];
										setSelectedIcon({
											type: 'emoji',
											name: randomEmoji,
											emoji: emojiData.emojis[randomEmoji].skins[0].native
										});
									}}>
									<Shuffle className="w-4 h-4" />
								</Button>
							</div>
							<ScrollArea className="h-[400px] py-4 mr-[-16px] pr-4 ">
								<div className="flex flex-col gap-2">
									{emojiData.categories.map(category => {
										let filteredEmojis = category.emojis;
										if (searchEmoji) {
											filteredEmojis = category.emojis.filter(emoji => {
												return filteredEmojisSet.has(emoji);
											});
										}

										if (filteredEmojis.length === 0) {
											return null;
										}

										return (
											<div key={category.id} className="flex flex-col gap-2">
												<span className="text-sm font-medium">{category.id}</span>
												<div className="grid grid-cols-8 gap-2 pt-2 pb-12 ">
													{filteredEmojis.map(emoji => {
														return (
															<Button
																variant="outline"
																size={'icon'}
																className="w-7 h-7"
																key={emoji}
																onClick={() =>
																	setSelectedIcon({
																		type: 'emoji',
																		name: emoji,
																		emoji: emojiData.emojis[emoji].skins[0].native
																	})
																}>
																{emojiData.emojis[emoji].skins[0].native}
															</Button>
														);
													})}
												</div>
											</div>
										);
									})}
								</div>
							</ScrollArea>
						</div>
					</TabsContent>
				</Tabs>
			</PopoverContent>
		</Popover>
	);
};
export default IconPicker;
