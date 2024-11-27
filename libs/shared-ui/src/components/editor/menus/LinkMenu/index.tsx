'use client';
import { Editor } from '@tiptap/core';
import { BubbleMenu } from '@tiptap/react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useFloating, autoUpdate, offset, flip } from '@floating-ui/react-dom';
import { Button } from '@shared/ui';
import { Copy, Globe } from 'lucide-react';
import { toast } from 'sonner';

type LinkMenuProps = {
	editor: Editor;
};
export const LinkMenu = ({ editor }: LinkMenuProps) => {
	const [linkHover, setLinkHover] = useState<null | HTMLElement>(null);
	const bubbleHoverRef = useRef<boolean>(false);
	const timeOutRef = useRef<NodeJS.Timeout | null>(null);
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
		const handleHover = (event: MouseEvent) => {
			clearTimeout(timeOutRef.current as NodeJS.Timeout);

			const target = event.target as HTMLElement;
			const isLinkElement = target.closest('a');
			if (isLinkElement) {
				// Forcefully show the link bubble menu
				// editor.commands.focus();
				console.log('HOVER-LINK:::', target);

				timeOutRef.current = setTimeout(() => {
					setLinkHover(isLinkElement);
				}, 100);
			}

			
		};

		const handleMouseout = () => {
			if (bubbleHoverRef.current) {
				return;
			}

			if(!linkHover) {
				clearTimeout(timeOutRef.current as NodeJS.Timeout);
				return;
			}

			timeOutRef.current = setTimeout(() => {
				setLinkHover(null);
			}, 300);
		};

		editor.$doc.element.addEventListener('mouseover', handleHover);
		editor.$doc.element.addEventListener('mouseout', handleMouseout);
		return () => {
			editor.$doc.element.removeEventListener('mouseover', handleHover);
			editor.$doc.element.removeEventListener('mouseout', handleMouseout);
		};
	}, [editor, setLinkHover, linkHover]);

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

			{/* <BubbleMenu
				editor={editor}
				shouldShow={shouldShowEditor}
				// pluginKey="link-menu"
				tippyOptions={{
					popperOptions: {
						modifiers: [{ name: 'flip', enabled: false }]
					},
					placement: 'bottom-start',
					offset: [-2, 16]
				}}>
				Edit Link
			</BubbleMenu> */}
		</>
	);
};
