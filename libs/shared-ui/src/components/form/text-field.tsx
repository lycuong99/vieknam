import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@shadcn-in-nx/ui/form';
import { Input } from '@shadcn-in-nx/ui/input';
import { PasswordInput } from '../custom/password-input';
import { FormFieldProps } from 'libs/shared-ui/src/types/form';
import { useFormContext } from 'react-hook-form';

export interface TextfieldProps extends FormFieldProps {
	type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
	className?: string;
	readOnly?: boolean;
}

export function Textfield({
	className = '',
	name,
	label,
	placeholder,
	type = 'text',
	readOnly = false,
	required = false,
	description
}: Readonly<TextfieldProps>) {
	const { control } = useFormContext();
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>
						{required && <span className="text-red-500 pr-0.5">*</span>}
						{label}
					</FormLabel>
					<FormControl>
						<Input className={className} placeholder={placeholder} type={type} {...field} readOnly={readOnly} />
					</FormControl>
					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

export function PasswordTextfield({ className = '', name, label, placeholder = '********' }: Readonly<TextfieldProps>) {
	const { control } = useFormContext();

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className="space-y-1">
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<PasswordInput className={className} placeholder={placeholder} {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
