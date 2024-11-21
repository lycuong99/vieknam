import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
// import Heading from '@tiptap/extension-heading';
// import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import Placeholder from '@tiptap/extension-placeholder';
import { useState } from 'react';

import { Bold, Italic, Strikethrough, Heading, Code } from 'lucide-react';

const RickTextEditor = () => {
	const [menuVisible, setMenuVisible] = useState(false);
	const [selectedText, setSelectedText] = useState('');

	const editor = useEditor({
		extensions: [
			StarterKit,
			// Heading,
			// BulletList,
			ListItem,
			Placeholder.configure({
				// Use a placeholder:
				placeholder: 'Write something … hêlo'
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
		},
		onSelectionUpdate: ({ editor }) => {
			const selection = editor.state.selection;
			const selectedContent = editor.state.doc.textBetween(selection.from, selection.to, ' ');

			if (selectedContent) {
				setSelectedText(selectedContent);
				setMenuVisible(true);
			} else {
				setMenuVisible(false);
			}
		}
	});
	if (!editor) {
		return null;
	}
	const toggleBold = () => {
		editor.chain().focus().toggleBold().run();
	};

	const toggleItalic = () => {
		editor.chain().focus().toggleItalic().run();
	};

	const toggleStrikethrough = () => {
		editor.chain().focus().toggleStrike().run();
	};

	const toggleHeading = level => {
		editor.chain().focus().toggleHeading({ level }).run();
	};

	const toggleBulletList = () => {
		editor.chain().focus().toggleBulletList().run();
	};

	const toggleOrderedList = () => {
		editor.chain().focus().toggleOrderedList().run();
	};

	const toggleCodeBlock = () => {
		editor.chain().focus().toggleCodeBlock().run();
	};

	return (
		<div>
			{menuVisible && (
				<div className="floating-menu">
					<button onClick={toggleBold} className={editor.isActive('bold') ? 'active' : ''}>
						<Bold size={16} />
					</button>
					<button onClick={toggleItalic} className={editor.isActive('italic') ? 'active' : ''}>
						<Italic size={16} />
					</button>
					<button onClick={toggleStrikethrough} className={editor.isActive('strike') ? 'active' : ''}>
						<Strikethrough size={16} />
					</button>
					<button onClick={() => toggleHeading(1)} className={editor.isActive('heading', { level: 1 }) ? 'active' : ''}>
						<Heading size={16} />
						H1
					</button>
					{/* <button onClick={toggleBulletList} className={editor.isActive('bulletList') ? 'active' : ''}>
						<Bull size={16} />
					</button>
					<button onClick={toggleOrderedList} className={editor.isActive('orderedList') ? 'active' : ''}>
						<OrderedList size={16} />
					</button> */}
					<button onClick={toggleCodeBlock} className={editor.isActive('codeBlock') ? 'active' : ''}>
						<Code size={16} />
					</button>
				</div>
			)}
			<EditorContent editor={editor} />
		</div>
	);
};

export { RickTextEditor };
