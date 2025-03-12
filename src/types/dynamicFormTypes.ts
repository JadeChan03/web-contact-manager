import { type Contact } from '../types/contactTypes';
type ContactField = keyof Contact;

export interface DynamicInputProps {
	fieldName: ContactField;
	values: string[];
	label: string;
	onAdd: (fieldName: ContactField) => void;
	onDelete: (fieldName: ContactField, index: number) => void;
	onChange: (fieldName: ContactField, index: number, value: string) => void;
	inputType?: React.HTMLInputTypeAttribute; // 'text' | 'tel' | 'email' etc.
	placeholder?: string;
	addButtonText?: string;
	showRemove?: boolean;
  }