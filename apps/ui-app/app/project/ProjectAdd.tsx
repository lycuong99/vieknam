'use client';

import { useState } from 'react';
import { HiOutlinePlusSm } from 'react-icons/hi';
import { useProjectStore } from '../../store/project';
import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Form,
	FormElements
} from '@shared/ui';
import { useForm } from 'react-hook-form';

export default function ProjectAdd() {
	// const { organization } = useOrganization()
	const { addProject } = useProjectStore();
	const [visible, setVisible] = useState(false);
	const form = useForm();
	return (
		<>
			<Dialog>
				<DialogTrigger asChild>
					<Button variant="outline" size="icon">
						<HiOutlinePlusSm />
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Create new project</DialogTitle>
						<DialogDescription></DialogDescription>
					</DialogHeader>
					<Form {...form}>
						<form>
							<FormElements.Textfield label="Project name" name="name" required />
							<FormElements.Textarea label="Desciption" name="desc" />
						</form>
					</Form>
					<DialogFooter>
						<Button type="submit">Save changes</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
