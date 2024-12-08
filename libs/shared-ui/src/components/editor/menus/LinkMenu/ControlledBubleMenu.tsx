import { useFloating, autoUpdate, offset, flip, useDismiss, useInteractions, FloatingOverlay } from '@floating-ui/react';
import { Editor, isNodeSelection, posToDOMRect } from '@tiptap/core';
import { ReactNode, useLayoutEffect } from 'react';

type Props = {
	editor: Editor;
	open: boolean;
	children: ReactNode;
	onOpenChange: any;
};

// Adapted from https://github.com/ueberdosis/tiptap/issues/2305#issuecomment-1020665146
export const ControlledBubbleMenu = ({ editor, open, children, onOpenChange }: Props) => {
	const { floatingStyles, refs, context } = useFloating({
		open: open,
		onOpenChange: (isOpen, event, reason) => {
			onOpenChange(isOpen);
			console.log(isOpen, event, reason);
		},
		strategy: 'fixed',
		whileElementsMounted: autoUpdate,
		placement: 'bottom',
		middleware: [
			offset({ mainAxis: 8 }),
			flip({
				padding: 8,
				boundary: editor.options.element,
				fallbackPlacements: ['bottom', 'top-start', 'bottom-start', 'top-end', 'bottom-end']
			})
		]
	});

	useLayoutEffect(() => {
		const { ranges } = editor.state.selection;
		const from = Math.min(...ranges.map(range => range.$from.pos));
		const to = Math.max(...ranges.map(range => range.$to.pos));

		refs.setReference({
			getBoundingClientRect() {
				if (isNodeSelection(editor.state.selection)) {
					const node = editor.view.nodeDOM(from) as HTMLElement | null;

					if (node) {
						return node.getBoundingClientRect();
					}
				}

				return posToDOMRect(editor.view, from, to);
			}
		});
	}, [refs, editor.view, editor.state.selection]);

	const dismiss = useDismiss(context,{
    outsidePress: true,
  });

	const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

	if (!open) return null;

	return (
		<>
	
			{open && <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
				{children}
			</div> }
		</>
	);
};
