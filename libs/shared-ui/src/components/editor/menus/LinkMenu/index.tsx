'use client';
import { Editor } from '@tiptap/core';
import { BubbleMenu } from '@tiptap/react';
import { useEffect, useState } from 'react';

type LinkMenuProps = {
	editor: Editor;
};
export const LinkMenu = ({ editor }: LinkMenuProps) => {
	const [linkHover, setLinkHover] = useState<null | HTMLElement>(null);

	const shoudlShow = () => {
		console.log('linkHover', linkHover);
		return !!linkHover;
	};

	useEffect(() => {
		const handleHover = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			const isLinkElement = target.closest('a');
			if (isLinkElement) {
				// Forcefully show the link bubble menu
				// editor.commands.focus();
				console.log('HOVER-LINK:::', target);

				setLinkHover(isLinkElement);
				// editor.commands.focus()
			}
		};

		const handleMouseout = () => {
			setLinkHover(null);
		};

		editor.$doc.element.addEventListener('mouseover', handleHover);
		editor.$doc.element.addEventListener('mouseout', handleMouseout);
		return () => {
			editor.$doc.element.removeEventListener('mouseover', handleHover);
			editor.$doc.element.removeEventListener('mouseout', handleMouseout);
		};
	}, [editor, setLinkHover]);

	return (
		<BubbleMenu
		
			editor={editor}
			  shouldShow={({ editor }) => !!linkHover} 
			// pluginKey="link-menu"
			tippyOptions={{
				popperOptions: {
					modifiers: [{ name: 'flip', enabled: false }]
				},
				placement: 'bottom-start',
				offset: [-2, 16]
			}}>
			Edit Link
		</BubbleMenu>
	);
};
