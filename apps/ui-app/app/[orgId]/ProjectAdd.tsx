'use client';

import { useId, useState } from 'react';
import { HiOutlinePlusSm } from 'react-icons/hi';
import { useProjectStore } from '../../store/project';
import {
	Alert,
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Form,
	FormControls
} from '@shared/ui';
import { useForm } from 'react-hook-form';
import IconPicker from 'apps/ui-app/components/IconPicker';
import { quickAddProjectSchema } from '@shared/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateProject } from 'apps/ui-app/services/project';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { getDataFromResponse } from 'apps/ui-app/utils';

interface ProjectAddProps {
	children?: React.ReactNode;
}

export default function ProjectAdd({ children }: ProjectAddProps) {
	const [isOpen, setIsOpen] = useState(false);
	// const { organization } = useOrganization()
	const form = useForm<z.infer<typeof quickAddProjectSchema>>({
		resolver: zodResolver(quickAddProjectSchema),
		defaultValues: {
			name: '',
			desc: ''
		}
	});
	const formId = useId();

	const formMutation = useCreateProject({
		mutationConfig: {
			onSuccess: () => {
				setIsOpen(false);
			}
		}
	});

	const { orgId } = useParams();

	if (!orgId) {
		toast.error('Organization not found');
		return;
	}

	async function onSubmit(data: z.infer<typeof quickAddProjectSchema>) {
		console.log(data);
		const resPromise = formMutation.mutateAsync({
			name: data.name,
			desc: data.desc ?? '',
			organizationId: orgId as string
		});

		const t = toast.promise(resPromise, {
			loading: 'Loading...',
			success: res => {
				return `${getDataFromResponse(res)?.name ?? data.name} has been added`;
			},
			error: res => {
				console.error(res);
				return res.message;
			}
		});

		return t.unwrap();
	}

	return (
		<>
			<Dialog modal open={isOpen} onOpenChange={setIsOpen}>
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
						<form id={formId} onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
							<IconPicker modal />

							<div className="flex gap-2 items-end">
								<FormControls.Textfield label="Project name" name="name" placeholder="e.g., Website Redesign" required />
							</div>
							<FormControls.Textarea
								label="Desciption"
								name="desc"
								placeholder="e.g., Redesign the company website to improve user experience and SEO."
							/>
						</form>
					</Form>
					<DialogFooter>
						<Button loading={form.formState.isSubmitting} form="myform" onClick={form.handleSubmit(onSubmit)} type="submit">
							Save changes
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
