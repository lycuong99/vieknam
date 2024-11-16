'use client';

import { ReactElement, useState } from 'react';
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
import IconPicker from 'apps/ui-app/components/IconPicker';

interface ProjectAddProps {
	children?: React.ReactNode;
}

export default function ProjectAdd({ children }: ProjectAddProps) {
	// const { organization } = useOrganization()
	const { addProject } = useProjectStore();
	const [visible, setVisible] = useState(false);
	const form = useForm();
	return (
		<>
			<Dialog modal>
				<DialogTrigger asChild>
					{children ? (
						children
					) : (
						<Button variant="outline" size="icon">
							<HiOutlinePlusSm />
						</Button>
					)}
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px] md:max-w-[505px] flex flex-col justify-between">
					<DialogHeader>
						<DialogTitle>Create new project</DialogTitle>
						<DialogDescription>Let’s set up the foundation for your next big idea!</DialogDescription>
					</DialogHeader>
					<Form {...form}>
						<form className="flex flex-col gap-4">
							<IconPicker modal />
							{/* <div className='space-y-2'>

								<Button type='button' size={'icon'} variant={'outline'} className=''>
									<HiOutlinePlusSm />
								</Button>
								</div> */}
							<div className="flex gap-2 items-end">
								
								<FormElements.Textfield label="Project name" name="name" placeholder="e.g., Website Redesign" required />
							</div>
							<FormElements.Textarea
								label="Desciption"
								name="desc"
								placeholder="e.g., Redesign the company website to improve user experience and SEO."
							/>
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
