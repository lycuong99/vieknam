import {
	BlockEditor,
	Button,
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Form,
	FormControl,
	FormControls,
	RickTextEditor
} from '@shared/ui';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { TaskStatus } from './TaskStatus';
import { TaskPriority } from '@prisma/client';
import { TaskPrioritySelect } from './TaskPrioritySelect';

export default function TaskCreate() {
	const form = useForm();
	const onSubmit = (data: unknown) => {
		console.log(data);
	};
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size={'xs'} leftSection={<Plus className="h-5 w-5" />}>
					Add Task
				</Button>
			</DialogTrigger>
			<DialogContent className="md:min-w-[640px] pl-5 pr-4 py-4">
				<DialogHeader>
					<DialogTitle>Add Task</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormControls.Textfield
							className="border-none  focus-visible:ring-0 shadow-none placeholder:font-semibold font-semibold text-xl px-0"
							name="title"
							placeholder="Task Name"
						/>
						{/* <FormControls.Textarea
							className="border-none  focus-visible:ring-0 shadow-none placeholder:font-normal text-lg px-0"
							name="desc"
							placeholder="Write something"
						/> */}
						<BlockEditor placeholder="Write something" />
						<div className='flex gap-1'><TaskStatus /> <TaskPrioritySelect/></div>
					</form>
				</Form>
				<DialogFooter>
					<Button type="submit">Create</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
