// import {
//   selectContactById,
//   selectContacts,
// } from '../../redux/slices/contactsSlice';
// import { useEffect } from 'react';
// import { useForm, useFieldArray, Control } from 'react-hook-form';
// import { useAppDispatch, useAppSelector } from '../../redux/hooks';
// import { contactUpdated } from '../../redux/slices/contactsSlice';
// import { useParams, useNavigate } from 'react-router-dom';
// import { type Contact } from '../../types/contactTypes';
// import { nanoid, EntityId } from '@reduxjs/toolkit';
// type ContactField = keyof Contact;

// import IconButton from '@mui/joy/IconButton';
// import { Card, CardContent, Typography, Button } from '@mui/joy';
// import RemoveIcon from '@mui/icons-material/Remove';
// import EditIcon from '@mui/icons-material/Edit';
// import Textarea from '@mui/joy/Textarea';

// export const EditContact: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const { id } = useParams();

//   // select the contact from the Redux store based on the id
//   const contact = useAppSelector((contactsState) =>
//     selectContactById(contactsState, id as EntityId)
//   );

//   const {
//     control,
//     handleSubmit,
//     register,
//     reset,
//     formState: { errors },
//   } = useForm<Contact>({
//     defaultValues: contact,
//   });

//   useEffect(() => {
//     if (contact) {
//       reset(contact);
//     }
//   }, [contact, reset]);

//   // field arrays for dynamic inputs
//   const {
//     fields: phoneFields,
//     append: appendPhone,
//     remove: removePhone,
//   } = useFieldArray({
//     control,
//     name: 'phones',
//   });

//   const renderDynamicInputs = (
//     fields: { id: string; value: string }[],
//     fieldName: ContactField,
//     label: string,
//     append: () => void,
//     remove: (index: number) => void,
//     control: Control<Contact>
//   ) => {
//     return (
//       <div>
//         {fields.map((field, index) => (
//           <div key={field.id}>
//             <input
//               {...control.register(`${fieldName}.${index}.value`)}
//               placeholder={`Add ${label}`}
//               // value={field.value}
//             />

//             {fields.length > 1 && (
//               <IconButton
//                 aria-label="Remove Input"
//                 onClick={() => remove(index)}
//                 variant="outlined"
//               >
//                 <RemoveIcon />
//               </IconButton>
//             )}
//           </div>
//         ))}
//         <Button onClick={append}>Add {label}</Button>
//       </div>
//     );
//   };

//   const onSubmit = (data: Contact) => {
//     if (!id) return;
//     dispatch(
//       contactUpdated({
//         id,
//         changes: data, // ID and changes must be passed separately
//       })
//     );
//     navigate(`/`);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       {/* first name */}
//       <div>
//         <label>First Name</label>
//         <input
//           {...register('firstName', { required: 'First name is required' })}
//           className={errors.firstName ? 'error' : ''}
//         />
//         {errors?.firstName && <span>{errors.firstName.message}</span>}
//       </div>

//       {/* last name */}
//       <div>
//         <label>Last Name</label>
//         <input
//           {...register('lastName', { required: 'Last name is required' })}
//           className={errors.lastName ? 'error' : ''}
//         />
//         {errors?.lastName && <span>{errors.lastName.message}</span>}
//       </div>

//       {/* phone numbers */}
//       <div>
//         <label>Phone Numbers</label>
//         {renderDynamicInputs(
//           phoneFields,
//           'phones',
//           'phone',
//           () => appendPhone({ id: nanoid(), value: '' }),
//           removePhone,
//           control
//         )}
//       </div>

//       {/* notes */}
//       <div>
//         <label>Notes</label>
//         <Textarea
//           {...register('notes')}
//           className={errors.notes ? 'error' : ''}
//           placeholder="Add notes"
//         />
//         {errors?.firstName && <span>{errors.firstName.message}</span>}
//       </div>

//       <button type="submit">Update Contact</button>
//     </form>
//   );
// };
