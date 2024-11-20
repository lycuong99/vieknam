import { Button, Dialog, DialogContent, DialogTrigger } from '@shared/ui';
import { Plus } from 'lucide-react';

export default function TaskCreate() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size={'xs'} leftSection={<Plus className="h-5 w-5" />}>
					Add Task
				</Button>
			</DialogTrigger>
			<DialogContent>
				<h1>Create Task</h1>
			</DialogContent>
		</Dialog>
	);
}
