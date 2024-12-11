import { Button, Input, Popover, PopoverContent, PopoverTrigger } from '@shared/ui';
import { MenuButton } from './MenuButton';
import { LinkIcon } from 'lucide-react';

export type EditLinkPopoverProps = {
	active: boolean;
	setLink: (url: string) => void;
};

export const EditLinkPopover = ({ active, setLink }: EditLinkPopoverProps) => {
	return (
		<Popover>
			<PopoverTrigger>
				<MenuButton active={active} tooltip="Set Link">
					<LinkIcon className="w-4 h-4" />
				</MenuButton>
			</PopoverTrigger>
			<PopoverContent className="p-1">
				<Input
					placeholder="Enter link"
					onKeyDown={e => {
						if (e.key === 'Enter') {
							setLink(e.currentTarget.value);
							e.currentTarget.value = '';
						}
					}}
				/>
				<Button onClick={() => setLink('https://linear.app/linear-1999/projects/all')}>Set Link</Button>
			</PopoverContent>
		</Popover>
	);
};
