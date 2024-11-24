import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
// import Heading from '@tiptap/extension-heading';
// import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import Placeholder from '@tiptap/extension-placeholder';
import { useState } from 'react';
import Document from '@tiptap/extension-document';
import { CodeBlock } from './extensions/CodeBlock';
import { TextMenu } from './menus/TextMenu';
import Underline from '@tiptap/extension-underline';
import Code from '@tiptap/extension-code';
import { cn } from '@shadcn-in-nx/utils';

interface BlockEditorProps {
	placeholder?: string;
	className?: string;
}
const BlockEditor = ({ placeholder, className }: BlockEditorProps) => {
	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				codeBlock: false
			}),
			Code,
			CodeBlock,
			// Heading,
			// BulletList,
			ListItem,
			Document,
			Underline,
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
		</div>
	);
};

export { BlockEditor };
