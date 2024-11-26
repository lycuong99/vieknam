import { mergeAttributes } from '@tiptap/core';
import TiptapLink from '@tiptap/extension-link';
import { Plugin } from '@tiptap/pm/state';
import { EditorView } from '@tiptap/pm/view';

export const Link = TiptapLink.extend({
	inclusive: false,

	parseHTML() {
		return [{ tag: 'a[href]:not([data-type="button"]):not([href *= "javascript:" i])' }];
	},

	renderHTML({ HTMLAttributes }) {
		return ['a', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { class: 'link' }), 0];
	},

	addProseMirrorPlugins() {
		const { editor } = this;

		return [
			...(this.parent?.() || []),
			new Plugin({
				props: {
					handleKeyDown: (view: EditorView, event: KeyboardEvent) => {
						const { selection } = editor.state;

						if (event.key === 'Escape' && selection.empty !== true) {
							editor.commands.focus(selection.to, { scrollIntoView: false });
						}

						return false;
					},
					handleDOMEvents: {
						mouseover: (view: EditorView, event: MouseEvent) => {
							const target = event.target as HTMLElement;

							if (target.tagName === 'A' && target.closest('.ProseMirror')) {
								const href = target.getAttribute('href');
								if (href) {
									editor.commands.setMeta('hoveredLink', { href, element: target });
								}
                                editor.commands.focus()
							}
							return false;
						},
						mouseout: (view: EditorView, event: MouseEvent) => {
							const target = event.target as HTMLElement;

							if (target.tagName === 'A') {
								editor.commands.setMeta('hoveredLink', null);
							}
							return false;
						}
					}
				}
			})
		];
	}
});

export default Link;
