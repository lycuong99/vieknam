'use client';
import { Editor } from '@tiptap/core';
import { BubbleMenu, useEditorState } from '@tiptap/react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useFloating, autoUpdate, offset, flip } from '@floating-ui/react-dom';
import { Button, Card, Input } from '@shared/ui';
import { Copy, Globe } from 'lucide-react';
import { toast } from 'sonner';
import { ControlledBubbleMenu } from 'libs/shared-ui/src/components/editor/menus/LinkMenu/ControlledBubleMenu';
import EditLink from './EditLink';

type LinkMenuProps = {
	editor: Editor;
};

const LIVE_TIME = 300;

export const LinkMenu = ({ editor }: LinkMenuProps) => {
	const [mounted, setMounted] = useState(false);
	const [linkHover, setLinkHover] = useState<null | HTMLAnchorElement>(null);

	const [openViewLink, setOpenViewLink] = useState(false);
	const [openEditLink, setOpenEditLink] = useState(false);

	const timeOutSetHoverRef = useRef<NodeJS.Timeout | null>(null);
	const timeOutRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		setMounted(true);
	}, []);

	const { floatingStyles, refs } = useFloating({
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
					setOpenViewLink(true);
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
					setOpenViewLink(false);
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
		setOpenViewLink(false);
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
				setOpenEditLink(true);
			}
			setOpenViewLink(false);
		}
	};

	useLayoutEffect(() => {
		if (linkHover) {
			refs.setReference(linkHover);
		}
	}, [linkHover, refs]);

	function handleEditLink(link: string) {
		const { from, to } = editor.state.selection;
		const linkAttrs = editor.getAttributes('link');

		if (linkAttrs.href) {
			// Tạo một transaction để cập nhật href mà không làm mất focus
			const tr = editor.state.tr;

			// Xoá mark link cũ
			tr.removeMark(from, to, editor.schema.marks.link);

			// Thêm lại mark link với href mới
			tr.addMark(from, to, editor.schema.marks.link.create({ href: link }));

			// Dispatch transaction để áp dụng thay đổi
			editor.view.dispatch(tr);
		}
	}

	function handleEditLinkTitle(linkContent: string) {
		const linkAttrs = editor.getAttributes('link');
		const { from, to } = editor.state.selection;
		const tr = editor.state.tr;

		tr.removeMark(from, to, editor.schema.marks.link); // Xoá link cũ
		tr.insertText(linkContent, from, to); // Thay thế nội dung
		tr.addMark(
			from,
			from + linkContent.length,
			editor.schema.marks.link.create(linkAttrs) // Gắn lại mark link
		);
		editor.view.dispatch(tr); // Cập nhật editor với transaction

		editor.commands.setTextSelection({ from, to: from + linkContent.length });
		console.log(linkHover);
	}

	function handleDeleteLink() {
		const { from, to } = editor.state.selection;
		const tr = editor.state.tr;
		tr.removeMark(from, to, editor.schema.marks.link);
		editor.view.dispatch(tr);

		setOpenEditLink(false);
	}

	if (!mounted) return null;

	const { from, to } = editor.state.selection;
	const linkContent = editor.state.doc.textBetween(from, to);

	return (
		<>
			{openViewLink && (
				<div
					ref={refs.setFloating}
					onMouseOver={() => {
						timeOutRef.current && clearTimeout(timeOutRef.current);
					}}
					onMouseOut={() => {
						timeOutRef.current = setTimeout(() => {
							if (openViewLink) {
								// setLinkHover(null);
								setOpenViewLink(false);
							}
						}, LIVE_TIME);
					}}
					style={{
						...floatingStyles
						// backgroundColor: 'rebeccapurple'
					}}>
					<div className="flex gap-2 items-center shadow-sm rounded-lg bg-white p-1 border border-gray-200">
						{linkHover && (
							<div className="flex gap-2 items-center px-2">
								<Globe className="h-4 w-4" />
								<span className="text-xs text-gray-500">{linkHover.getAttribute('href')}</span>
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

			<ControlledBubbleMenu open={openEditLink} editor={editor} onOpenChange={setOpenEditLink}>
				<EditLink
					linkTitle={linkContent}
					link={editor.getAttributes('link').href ?? ''}
					editor={editor}
					onEditLink={handleEditLink}
					onEditLinkTitle={handleEditLinkTitle}
					onRemoveLink={handleDeleteLink}
				/>
			</ControlledBubbleMenu>
		</>
	);
};
