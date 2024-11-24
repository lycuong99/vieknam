import { Editor } from '@tiptap/core';
import { BubbleMenu } from '@tiptap/react';
import { Button, cn, Separator, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@shared/ui';
import { Bold, Code, Italic, Strikethrough, Underline } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@shadcn-in-nx/ui/toggle-group';
import { ButtonHTMLAttributes } from 'react';

export type TextMenuProps = {
	editor: Editor;
};

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

export const TextMenu = ({ editor }: TextMenuProps) => {
	const isItalic = editor.isActive('italic');
	const isStrike = editor.isActive('strike');
	const isBold = editor.isActive('bold');
	const isUnderline = editor.isActive('underline');
	const isInlineCode = editor.isActive('code');

	const onItalic = () => editor.chain().focus().toggleItalic().run();
	const onBold = () => editor.chain().focus().toggleBold().run();
	const onUnderline = () => editor.chain().focus().toggleUnderline().run();
	const onStrike = () => editor.chain().focus().toggleStrike().run();

	const onCode = () => editor.chain().focus().toggleCode().run();
	return (
		<BubbleMenu
			editor={editor}
			pluginKey={'text'}
			tippyOptions={{
				placement: 'top-start'
			}}>
			<div className="flex items-center justify-center bg-white rounded-lg border p-1 gap-1 h-10">
				<MenuButton active={isItalic} tooltip="Italic" onClick={onItalic}>
					<Italic className="w-4 h-4" />
				</MenuButton>
				<MenuButton active={isBold} tooltip="Italic" onClick={onBold}>
					<Bold className="w-4 h-4" />
				</MenuButton>
				<MenuButton active={isUnderline} tooltip="Italic" onClick={onUnderline}>
					<Underline className="w-4 h-4" />
				</MenuButton>
				<MenuButton active={isStrike} tooltip="Italic" onClick={onStrike}>
					<Strikethrough className="w-4 h-4" />
				</MenuButton>

				<Separator orientation="vertical" className="my-4" />
					
				<MenuButton active={isInlineCode} tooltip="Italic" onClick={onCode}>
					<Code className="w-4 h-4" />
				</MenuButton>
			</div>
		</BubbleMenu>
	);
};
