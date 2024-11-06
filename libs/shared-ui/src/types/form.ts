import { Control } from 'react-hook-form';

export interface FormFieldProps {
	control?: Control<any>;
	label?: string;
	placeholder?: string;
	name: string;
	description?: string;
	required?: boolean;
}
