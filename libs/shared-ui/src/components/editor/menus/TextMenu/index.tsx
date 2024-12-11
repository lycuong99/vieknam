import { Editor } from '@tiptap/core';
import { BubbleMenu } from '@tiptap/react';
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
import { Bold, Code, Italic, LinkIcon, Strikethrough, Underline } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@shadcn-in-nx/ui/toggle-group';
import { ButtonHTMLAttributes } from 'react';
import { useTextmenuStates } from 'libs/shared-ui/src/components/editor/menus/TextMenu/hooks/useTextmenuStates';
import { MenuButton } from 'libs/shared-ui/src/components/editor/menus/TextMenu/components/MenuButton';
import { EditLinkPopover } from 'libs/shared-ui/src/components/editor/menus/TextMenu/components/EditLinkPopover';

export type TextMenuProps = {
	editor: Editor;
};

export const TextMenu = ({ editor }: TextMenuProps) => {
	const isItalic = editor.isActive('italic');
	const isStrike = editor.isActive('strike');
	const isBold = editor.isActive('bold');
	const isUnderline = editor.isActive('underline');
	const isInlineCode = editor.isActive('code');
	const isLink = editor.isActive('link');

	const onItalic = () => editor.chain().focus().toggleItalic().run();
	const onBold = () => editor.chain().focus().toggleBold().run();
	const onUnderline = () => editor.chain().focus().toggleUnderline().run();
	const onStrike = () => editor.chain().focus().toggleStrike().run();

	const onCode = () => editor.chain().focus().toggleCode().run();
	const onLink = (url: string) => editor.chain().focus().setLink({ href: url, target: '_blank' }).run();

	const { shoudShow } = useTextmenuStates(editor);
	return (
		<BubbleMenu
			editor={editor}
			shouldShow={shoudShow}
			pluginKey={'text-menu'}
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

				<EditLinkPopover active={isLink} setLink={onLink} />
			</div>
		</BubbleMenu>
	);
};
