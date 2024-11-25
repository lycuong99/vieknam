import { EditorContent, useEditor } from '@tiptap/react';
// import Heading from '@tiptap/extension-heading';
// import BulletList from '@tiptap/extension-bullet-list';
import Placeholder from '@tiptap/extension-placeholder';
import { TextMenu } from './menus/TextMenu';
import { cn } from '@shadcn-in-nx/utils';
import { ExtensionKit } from 'libs/shared-ui/src/components/editor/extensions';
import { LinkMenu } from 'libs/shared-ui/src/components/editor/menus/LinkMenu';

interface BlockEditorProps {
	placeholder?: string;
	className?: string;
}
const BlockEditor = ({ placeholder, className }: BlockEditorProps) => {
	const editor = useEditor({
		extensions: [
			...ExtensionKit,
			Placeholder.configure({
				// Use a placeholder:
				placeholder: placeholder
				// Use different placeholders depending on the node type:
				// placeholder: ({ node }) => {
				//   if (node.type.name === 'heading') {
				//     return 'What’s the title?'
				//   }

				//   return 'Can you add some further context?'
				// },
			})
		],
		// content: '<p>Hello World! 🌎️</p>',
		editorProps: {
			attributes: {
				class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none'
			}
		}
	});

	return (
		<div className={cn('py-2 min-h-[80px]', className)}>
			<EditorContent editor={editor} />
			{editor && <TextMenu editor={editor} />}
			{editor && <LinkMenu editor={editor} />}
		</div>
	);
};

export { BlockEditor };
