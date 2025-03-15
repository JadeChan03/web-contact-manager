// import { type Contact } from '../types/contactTypes';
// type ContactField = keyof Contact;
// import { Control, FieldArrayWithId } from 'react-hook-form';

// export interface DynamicInputProps {
// 	control: Control<Contact, string>; 
// 	index: number;
// 	field: FieldArrayWithId<FieldArrayWithId, never>; 
// 	remove: (index: number) => void;
// 	append: (value: { id: string; number?: string; email?: string }) => void; // Adjust based on field type
// 	fieldName: ContactField; // ie. 'phones', 'emails'
// }
// // export interface DynamicInputProps {
// // 	fieldArray?: UseFieldArrayReturn<Contact>;
// // 	control?: Control<Contact>;
// // 	label: string;
// // 	inputType?: string;
// // 	placeholder?: string;
// // 	register: UseFormRegister<Contact>; // ? * not sure
// // 	fieldName: string;
// // 	errors?: FieldErrors<Contact>; // ? * not sure
// // 	validation?: {pattern?: {value: RegExp, message?: string}}; // ? * not sure
// //   }


// // {
// // 	fieldName: ContactField;
// // 	values: string[];
// // 	label: string;
// // 	onAdd: (fieldName: ContactField) => void;
// // 	onDelete: (fieldName: ContactField, index: number) => void;
// // 	onChange: (fieldName: ContactField, index: number, value: string) => void;
// // 	inputType?: React.HTMLInputTypeAttribute; 
// // 	placeholder?: string;
// // 	addButtonText?: string;
// // 	showRemove?: boolean;
// //   }