import { Editor } from '@tiptap/core';
import { BubbleMenu } from '@tiptap/react';

type LinkMenuProps = {
	editor: Editor;
};
export const LinkMenu = ({ editor }: LinkMenuProps) => {
	const shoudlShow = () => {
		return editor.isActive('link');
	};

	return (
		<BubbleMenu
			editor={editor}
			shouldShow={shoudlShow}
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
