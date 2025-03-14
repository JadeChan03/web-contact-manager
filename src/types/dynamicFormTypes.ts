import { type Contact } from '../types/contactTypes';
// type ContactField = keyof Contact;
import { UseFieldArrayReturn, Control } from 'react-hook-form';

export interface DynamicInputProps {
	fieldArray: UseFieldArrayReturn<Contact>;
	control?: Control<Contact>;
	label: string;
	inputType?: string;
	placeholder?: string;
	register: any; // idk
	fieldName: string;
	errors?: any; // idk
	validation?: Record<string, RegExp>; // idk
  }


// {
// 	fieldName: ContactField;
// 	values: string[];
// 	label: string;
// 	onAdd: (fieldName: ContactField) => void;
// 	onDelete: (fieldName: ContactField, index: number) => void;
// 	onChange: (fieldName: ContactField, index: number, value: string) => void;
// 	inputType?: React.HTMLInputTypeAttribute; 
// 	placeholder?: string;
// 	addButtonText?: string;
// 	showRemove?: boolean;
//   }