// import { useForm, useFieldArray } from 'react-hook-form';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useAppDispatch, useAppSelector } from '../../redux/hooks';
// import { updateContact } from '../../redux/slices/contactsSlice';
// import { ContactCard } from '../ContactCard/ContactCard';
// import { DynamicInput } from '../DynamicInput/DynamicInput';
// import { Contact } from '../../types/contactTypes';
// import { selectContactById } from '../../redux/slices/contactsSlice';

// export const EditContact = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
  
//   // Get contact from Redux store using URL parameter ID
//   const contact = useAppSelector((state) => 
//     selectContactById(state, id || '')
//   );

//   const { control, handleSubmit, register, watch, reset, formState: { errors } } = useForm<Contact>({
//     defaultValues: contact || undefined
//   });

//   // Reset form when contact loads/changes
//   useEffect(() => {
//     if (contact) reset(contact);
//   }, [contact, reset]);

//   const onSubmit = (data: Contact) => {
//     if (!id) return;
//     dispatch(updateContact({ ...data, id }));
//     navigate(`/contacts/${id}`);
//   };

//   if (!contact) {
//     return <div>Contact not found</div>;
//   }

//   const formValues = watch();

//   return (
//     <div className="edit-contact-container">
//       <form onSubmit={handleSubmit(onSubmit)} className="edit-form">
//         <h2>Edit Contact</h2>

//         {/* First Name */}
//         <div className="form-section">
//           <label>
//             First Name:
//             <input
//               {...register('firstName', { required: 'First name is required' })}
//               className={errors.firstName ? 'error' : ''}
//             />
//             {errors.firstName && <span className="error-message">{errors.firstName.message}</span>}
//           </label>
//         </div>

//         {/* Last Name */}
//         <div className="form-section">
//           <label>
//             Last Name:
//             <input
//               {...register('lastName', { required: 'Last name is required' })}
//               className={errors.lastName ? 'error' : ''}
//             />
//             {errors.lastName && <span className="error-message">{errors.lastName.message}</span>}
//           </label>
//         </div>

//         {/* Dynamic Inputs */}
//         <DynamicInput
//           control={control}
//           label="Phone"
//           inputType="tel"
//           placeholder="+852 1234-5678"
//           register={register}
//           fieldName="phones"
//           errors={errors}
//           validation={{
//             pattern: {
//               value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
//               message: 'Invalid phone number'
//             }
//           }}
//         />

//         <DynamicInput
//           control={control}
//           label="Email"
//           inputType="email"
//           placeholder="your@email.com"
//           register={register}
//           fieldName="emails"
//           errors={errors}
//           validation={{
//             pattern: {
//               value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//               message: 'Invalid email address'
//             }
//           }}
//         />

//         <DynamicInput
//           control={control}
//           label="Address"
//           inputType="text"
//           placeholder="street, city"
//           register={register}
//           fieldName="addresses"
//           errors={errors}
//         />

//         {/* Other fields... */}

//         <div className="form-actions">
//           <button type="submit">Save Changes</button>
//           <button type="button" onClick={() => navigate(-1)}>Cancel</button>
//         </div>
//       </form>

//       <div className="preview-section">
//         <h3>Preview</h3>
//         <ContactCard contact={formValues} />
//       </div>
//     </div>
//   );
// };