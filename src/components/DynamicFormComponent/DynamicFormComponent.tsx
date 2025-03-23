// import { Controller, useFormContext } from 'react-hook-form';
// import {
//   FormControl,
//   FormHelperText,
//   Input,
//   Textarea,
//   Select,
//   Option,
// } from '@mui/joy';
// import { validateInput } from '../../utils/validate';
// import { PhoneInput } from '../PhoneInput/PhoneInput';

// interface DynamicFormProps {
//   fieldName: string;
//   label: string;
//   type?: 'text' | 'email' | 'url' | 'phone' | 'textarea';
//   required?: boolean;
//   maxLength?: number;
//   validationType?: 'email' | 'url' | 'phone';
// }

// export const DynamicFormComponent: React.FC<DynamicFormProps> = ({
//   fieldName,
//   label,
//   type = 'text',
//   required = false,
//   maxLength,
//   validationType,
// }) => {
//   const { control } = useFormContext();

//   return (
//     <Controller
//       name={fieldName}
//       control={control}
//       rules={{
//         required: required ? 'Required' : false,
//         validate: (value) =>
//           validationType ? validateInput(value, validationType) : true,
//         maxLength: maxLength
//           ? { value: maxLength, message: 'Max length exceeded' }
//           : undefined,
//       }}
//       render={({ field, fieldState }) => (
//         <FormControl error={!!fieldState.error}>
//           {type === 'textarea' ? (
//             <Textarea {...field} placeholder={label} />
//           ) : type === 'phone' ? (
//             <PhoneInput {...field} />
//           ) : (
//             <Input {...field} type={type} placeholder={label} />
//           )}{' '}
//           {fieldState.error && (
//             <FormHelperText>{fieldState.error.message}</FormHelperText>
//           )}
//         </FormControl>
//       )}
//     />
//   );
// };
