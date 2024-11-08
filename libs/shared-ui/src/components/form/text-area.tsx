import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@shadcn-in-nx/ui/form';
import { Textarea as TextareaUi } from '@shadcn-in-nx/ui/textarea';
import { cn } from '@shadcn-in-nx/utils';
import { FormFieldProps } from 'libs/shared-ui/src/types/form';
import { useFormContext } from 'react-hook-form';

export interface TextareaProps extends FormFieldProps {
	className?: string | undefined;
}

export function Textarea({ className, name, label, placeholder }: TextareaProps) {
	const { control } = useFormContext();
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<TextareaUi placeholder={placeholder} className={cn('resize-none', className)} {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
