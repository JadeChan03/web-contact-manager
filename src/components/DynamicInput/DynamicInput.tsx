// import { Controller } from "react-hook-form";
// import { nanoid } from 'nanoid';
// import { DynamicInputProps } from '../../types/dynamicFormTypes';

// export const DynamicInput: React.FC<DynamicInputProps> = ({ control, index, remove, append, fieldName }) => {
//   return (
//     <div>
//       <Controller
//         control={control}
//         name={`${fieldName}.${index}`} 
//         render={({ field: inputField }) => (
//           <>
//             <input {...inputField} placeholder={`Enter ${fieldName.slice(0, -1)}`} />
//             <button type="button" onClick={() => remove(index)}> x </button>
//           </>
//         )}
//       />
//       <button type="button" onClick={() => append({ id: nanoid(), number: '' })}>
//         add {fieldName.slice(0, -1)}
//       </button>
//     </div>
//   );
// };

// // import { Contact } from '../../types/contactTypes';
// // type ContactField = keyof Contact;
// // import { useFieldArray } from 'react-hook-form';
// // import { DynamicInputProps } from '../../types/dynamicFormTypes';

// // export const DynamicInput: React.FC<DynamicInputProps> = ({
// //   fieldArray,
// //   label,
// //   control,
// //   inputType = 'text',
// //   placeholder = '',
// //   register,
// //   fieldName,
// //   errors,
// //   validation = {},
// // }) => {
// //   const { fields, append, remove } = fieldArray;
// //   console.log('fields ', fields)

// //  console.log('fieldArray ', fieldArray)

// //   return (
// //     <div className="dynamic-section">
// //       <label>{label}</label>
// //       {fields.map((field, index) => (
// //         <div key={field.id} className="dynamic-input-group">
// //           <input
// //             type={inputType}
// //             {...register(`${fieldName}.${index}` as const, validation)}
// //             placeholder={placeholder}
// //             className={errors?.[fieldName]?.[index] ? 'error' : ''}
// //           />
// //           {fields.length > 1 && (
// //             <button type="button" onClick={() => remove(index)}>
// //               x
// //             </button>
// //           )}
// //           {errors?.[fieldName]?.[index] && (
// //             <span>{errors[fieldName][index].message}</span>
// //           )}
// //         </div>
// //       ))}
// //       <button type="button" onClick={() => append(index)}>
// //         add {label}
// //       </button>
// //     </div>
// //   );
// // };
