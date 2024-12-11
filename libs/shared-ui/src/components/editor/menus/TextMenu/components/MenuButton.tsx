import {
	Button,
	cn,
	Input,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Separator,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@shared/ui';
import { Bold, Code, Italic, LinkIcon, Strikethrough, Underline } from 'lucide-reac
import { ButtonHTMLAttributes } from 'react';

type MenuButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	tooltip?: string;
	active?: boolean;
};
export const MenuButton = ({ active, tooltip, children, ...rest }: MenuButtonProps) => {
	const content = (
		<Button
			size={'icon'}
			variant={'ghost'}
			className={cn({
				'bg-slate-300 hover:bg-slate-300': active
			})}
			{...rest}>
			{children}
		</Button>
	);
	if (tooltip) {
		return (
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>{content}</TooltipTrigger>
					<TooltipContent>{tooltip}</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		);
	}

	return content;
};