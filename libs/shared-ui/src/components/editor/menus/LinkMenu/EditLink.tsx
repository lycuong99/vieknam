import { Button } from '@shadcn-in-nx/ui/button';
import { Card } from '@shadcn-in-nx/ui/card';
import { Input } from '@shadcn-in-nx/ui/input';
import { Separator } from '@shadcn-in-nx/ui/separator';
import { Editor } from '@tiptap/core';
import { Delete } from 'lucide-react';
import { useState } from 'react';

interface EditLinkProps {
	link: string;
	linkTitle: string;
	editor: Editor;
	onEditLink: (link: string) => void;
	onEditLinkTitle: (title: string) => void;
}
const EditLink = ({ editor, onEditLink, onEditLinkTitle, link: initLink, linkTitle }: EditLinkProps) => {
	const [link, setLink] = useState(initLink);
	return (
		<Card className="w-80 flex flex-col p-1 gap-1 ">
			<div className="flex flex-col  gap-2 p-1">
				<Input
					placeholder="Link"
					value={link}
					title="Link"
					onChange={e => {
						onEditLink(e.target.value);
						setLink(e.target.value);
					}}
				/>
				<Input placeholder="Title" value={linkTitle} onChange={e => onEditLinkTitle(e.target.value)} />
			</div>

			<Separator />
			<Button variant={'ghost'} size={'sm'} leftSection={<Delete />}>
				Remove Link
			</Button>
		</Card>
	);
};

export default EditLink;
