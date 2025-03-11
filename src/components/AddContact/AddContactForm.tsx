// import { useForm, submitHandler, useFieldArray } from 'react-hook-form';

// export const AddContactForm = () => {
//   const { register, control, handleSubmit } = useForm();

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: 'test',
//   });

//   return (
//     <form onSubmit={handleSubmit((data) => console.log(data))}>
//       <ul>
//         {fields.map((item, index) => (
//           <li key={item.id}>
//             <input {...register(`test.${index}.firstName`)} />
//             <Controller
//               render={({ field }) => <input {...field} />}
//               name={`test.${index}.lastName`}
//               control={control}
//             />
//             <button type="button" onClick={() => remove(index)}>
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//       <button
//         type="button"
//         onClick={() => append({ firstName: 'bill', lastName: 'luo' })}
//       >
//         append
//       </button>
//       <input type="submit" />
//     </form>

//     // <form onSubmit={handleSubmit((data) => console.log(data))}>
//     //   <label>first name: </label>
//     //   <input {...register('firstName')} />
//     //   <br/>
//     //   <label>last name: </label>
//     //   <input {...register('lastName', { required: true })} />
//     //   {errors.lastName && <p>Last name is required.</p>}
//     //   <br/>
//     //   <label>phone number: </label>
//     //   <input {...register('phone', { pattern: /\d+/ })} />
//     //   {errors.phone && <p>Please enter number for phone.</p>}
//     //   <br/>
//     //   <input type="submit" />
//     // </form>
//   );
// };
