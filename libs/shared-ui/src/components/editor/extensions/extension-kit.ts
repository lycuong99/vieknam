import StarterKit from '@tiptap/starter-kit';
// import Heading from '@tiptap/extension-heading';
// import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import Document from '@tiptap/extension-document';
import { CodeBlock } from './CodeBlock';
import Underline from '@tiptap/extension-underline';
import Code from '@tiptap/extension-code';
import Link from '@tiptap/extension-link';

export const ExtensionKit = [
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
	Link.configure({
		defaultProtocol: 'https',
		protocols: ['http', 'https'],
		HTMLAttributes: {
			class: 'text-primary-600 hover:text-primary-800 visited:text-primary-800 cursor-pointer underline hover:no-underline'
		},
        openOnClick: false,
	}),
];
