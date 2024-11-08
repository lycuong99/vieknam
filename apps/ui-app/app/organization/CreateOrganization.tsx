'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, FormElements, Textfield } from '@shared/ui';
import { quickAddProjectSchema } from '@shared/validation';
import { createOrg } from 'apps/ui-app/services/organization';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function CreateOrganization() {
	const form = useForm({
		resolver: zodResolver(quickAddProjectSchema)
	});

	const onSubmit = async (data: any) => {
		console.log(data);

		try {
			const res = await createOrg(data);
			toast.success('Successful');
		} catch (error) {
			toast.error('Something went wrong');
		}
	};
	return (
		<div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="bg-indigo-50 w-screen h-screen flex items-center justify-center">
						<div className="bg-white w-[500px] p-8 border border-indigo-100 rounded-lg shadow-xl shadow-indigo-100">
							<h2 className="text-2xl font-bold text-gray-800 mb-3">Build Your Organization.</h2>
							<p className="text-sm text-gray-400">
								Create your organization profile to unlock powerful project management tools.
								<br />
							</p>

							<div>
								<div className="flex items-center gap-4 space-y-4">
									<img
										className="h-[50px] w-[50px] rounded-md border border-dashed border-gray-300 bg-gray-100"
										src={'https://www.freepnglogos.com/uploads/company-logo-png/company-logo-transparent-png-19.png'}
									/>
									<div>
										<Button type="button" size={'sm'} variant={'outline'}>
											Upload
										</Button>
										<p className="text-gray-400 text-xs mt-1">.png, .jpeg files up to 4mb. Recommended size is 256x256</p>
									</div>
								</div>

								<div className="mt-4 flex flex-col gap-2">
									<Textfield name="name" label="Organization Name" placeholder="e.g., Acme Corp" required />
									{/* <Textfield name="desc" label="Description" placeholder="Description" /> */}
									<FormElements.Textarea
										name="desc"
										label="Description"
										placeholder="Briefly describe the organization’s mission or purpose."
									/>
									<Button loading={form.formState.isLoading} type="submit" className="mt-4">
										Create Organization
									</Button>
								</div>
							</div>
						</div>
					</div>
				</form>
			</Form>
		</div>
	);
}
