import { useCallback } from 'react';
import { Editor, isTextSelection } from '@tiptap/react';
import { ShouldShowProps } from '../../types';
import { Link } from 'libs/shared-ui/src/components/editor/extensions';
export const useTextmenuStates = (editor: Editor) => {
	const shoudShow = useCallback(
		({ view }: ShouldShowProps) => {
			if (!view || editor.view.dragging) {
				return false;
			}
			if (isCustomNodeSelected(editor)) {
				console.log('isCustomNodeSelected');
				return false;
			}

			return isSelectedText(editor);
		},
		[editor]
	);
	return {
		shoudShow
	};
};

const isCustomNodeSelected = (editor: Editor) => {
	return editor.isActive(Link.name);
};

const isSelectedText = (editor: Editor) => {
	const { from, to, empty } = editor.state.selection;

	const isEmptyTextBlock = !editor.state.doc.textBetween(from, to).length && isTextSelection(editor.state.selection);

	console.log('isEmptyTextBlock', isEmptyTextBlock);
	console.log('empty', empty);

    if(empty || !editor.isEditable || isEmptyTextBlock) {
        return false
    }

	return true;
};
