'use client';
import { Editor } from '@tiptap/core';
import { BubbleMenu } from '@tiptap/react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useFloating, autoUpdate, offset, flip } from '@floating-ui/react-dom';
import { Button } from '@shared/ui';
import { Copy, Globe } from 'lucide-react';
import { toast } from 'sonner';
import { ControlledBubbleMenu } from 'libs/shared-ui/src/components/editor/menus/LinkMenu/ControlledBubleMenu';

type LinkMenuProps = {
	editor: Editor;
};

const LIVE_TIME = 300;

export const LinkMenu = ({ editor }: LinkMenuProps) => {
	const [mounted, setMounted] = useState(false);
	const [linkHover, setLinkHover] = useState<null | HTMLElement>(null);
	const bubbleHoverRef = useRef<boolean>(false);

	const timeOutSetHoverRef = useRef<NodeJS.Timeout | null>(null);
	const timeOutRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		setMounted(true);
	}, []);
	const shoudlShow = () => {
		console.log('linkHover', linkHover);
		return !!linkHover;
	};

	const shouldShowEditor = () => {
		return editor.isActive('link');
	};

	const { floatingStyles, refs } = useFloating({
		strategy: 'fixed',
		whileElementsMounted: autoUpdate,
		placement: 'top',
		middleware: [
			offset({ mainAxis: 8 }),
			flip({
				padding: 8,
				boundary: editor.options.element,
				fallbackPlacements: ['bottom', 'top-start', 'bottom-start', 'top-end', 'bottom-end']
			})
		]
	});

	useEffect(() => {
		if (!mounted || !editor.$doc?.element) return;
		const handleHover = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			const isLinkElement = target.closest('a') as HTMLAnchorElement | null;

			if (isLinkElement) {
				if (timeOutRef.current) {
					clearTimeout(timeOutRef.current);
					timeOutRef.current = null;
				}

				timeOutSetHoverRef.current = setTimeout(() => {
					setLinkHover(isLinkElement);
				}, LIVE_TIME);
			}
		};

		const handleMouseout = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			const isLinkElement = target.closest('a');

			if (isLinkElement) {
				if (timeOutSetHoverRef.current) {
					clearTimeout(timeOutSetHoverRef.current);
					timeOutSetHoverRef.current = null;
				}

				if (timeOutRef.current) {
					clearTimeout(timeOutRef.current);
					timeOutRef.current = null;
				}
				timeOutRef.current = setTimeout(() => {
					setLinkHover(null);
				}, LIVE_TIME);
			}
		};

		const docElement = editor.$doc.element;
		docElement.addEventListener('mouseover', handleHover);
		docElement.addEventListener('mouseout', handleMouseout);

		return () => {
			docElement.removeEventListener('mouseover', handleHover);
			docElement.removeEventListener('mouseout', handleMouseout);
		};
	}, [mounted, editor]);

	const copyLink = () => {
		const link = linkHover?.getAttribute('href');
		if (link) {
			navigator.clipboard.writeText(link);
		}
		setLinkHover(null);
		toast('Copied Link to clipboard', {
			position: 'bottom-center'
		});
	};

	const editLink = () => {
		if (linkHover !== null) {
			const startPos = editor.view.posAtDOM(linkHover, 0);
			if (linkHover.textContent) {
				const endPos = startPos + linkHover.textContent.length;
				editor.commands.setTextSelection({ from: startPos, to: endPos });
				editor.commands.focus();
			}
		}

		setLinkHover(null);
	};

	useLayoutEffect(() => {
		if (linkHover) {
			refs.setReference(linkHover);
		}
	}, [linkHover, refs]);

	if (!mounted) return null;

	return (
		<>
			{shoudlShow() && (
				<div
					ref={refs.setFloating}
					onMouseOver={() => {
						bubbleHoverRef.current = true;
						clearTimeout(timeOutRef.current!);
					}}
					onMouseOut={() => {
						bubbleHoverRef.current = false;
						timeOutRef.current = setTimeout(() => {
							if (!linkHover) {
								setLinkHover(null);
							}
						}, 300);
					}}
					style={{
						...floatingStyles
						// backgroundColor: 'rebeccapurple'
					}}>
					<div className="flex gap-2 items-center shadow-sm rounded-lg bg-white p-1 border border-gray-200">
						{linkHover && (
							<div className="flex gap-2 items-center px-2">
								{/* <img src={linkHover.href} className="w-4 h-4 rounded-full" /> */}
								<Globe className="h-4 w-4" />
								<span className="text-xs text-gray-500">{linkHover?.href}</span>
							</div>
						)}
						<Button size={'iconSm'} variant={'ghost'} onClick={copyLink}>
							<Copy className="h-4 w-4" />
						</Button>
						<Button size={'xs'} variant={'ghost'} onClick={editLink}>
							Edit
						</Button>
					</div>
				</div>
			)}

			<ControlledBubbleMenu open={!editor.view.state.selection.empty && shouldShowEditor()} editor={editor}>
				EDIT LINK
			</ControlledBubbleMenu>
		</>
	);
};
