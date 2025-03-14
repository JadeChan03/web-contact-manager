import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useAppDispatch } from '../../redux/hooks';
import { nanoid } from '@reduxjs/toolkit';
import { contactAdded } from '../../redux/slices/contactsSlice';
import { type Contact } from '../../types/contactTypes';

import { DynamicInput } from '../DynamicInput/DynamicInput';

export const AddContact = () => {
	const dispatch = useAppDispatch();
	const [visibility, setVisibility] = useState(false);
	const { control, handleSubmit, register, reset, formState: { errors } } = useForm<Contact>({
	  defaultValues: {
		id: nanoid(),
		firstName: '',
		lastName: '',
		phones: [''],
		emails: [''],
		addresses: [''],
		categories: [''],
		organisation: '',
		webUrl: '',
		notes: '',
		tags: ['']
	  }
	});
  
	// field arrays for dynamic inputs
	const phones = useFieldArray({ control, name: 'phones' });
	const emails = useFieldArray({ control, name: 'emails' });
	const addresses = useFieldArray({ control, name: 'addresses' });
	const categories = useFieldArray({ control, name: 'categories' });
	const tags = useFieldArray({ control, name: 'tags' });
  
	const toggleForm = (e: React.MouseEvent<HTMLButtonElement>) => {
	  e.preventDefault();
	  setVisibility(!visibility);
	  reset();
	};
  
	const onSubmit = (data: Contact) => {
	  const newContact = { ...data, id: nanoid() };
	  dispatch(contactAdded(newContact));
	  setVisibility(false);
	  reset();
	};

  return (
	<>
	<button onClick={toggleForm}>
	  {visibility ? 'Close Form' : 'Add New Contact'}
	</button>

	{visibility && (
	  <form onSubmit={handleSubmit(onSubmit)}>
		{/* first name */}
		<div>
		  <label>First Name</label>
		  <input
			{...register('firstName', { required: 'First name is required' })}
			className={errors.firstName ? 'error' : ''}
		  />
		  {errors.firstName && <span>{errors.firstName.message}</span>}
		</div>

		{/* last name */}
		<div>
		  <label>Last Name</label>
		  <input
			{...register('lastName', { required: 'Last name is required' })}
			className={errors.lastName ? 'error' : ''}
		  />
		  {errors.lastName && <span>{errors.lastName.message}</span>}
		</div>

		{/* phone numbers */}
		<DynamicInput
		  fieldArray={phones}
		  label="Phone"
		  inputType="tel"
		  placeholder="+852 1234-5678"
		  register={register}
		  fieldName="phones"
		  errors={errors}
		  validation={{ pattern: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/ }}
		/>

		{/* emails */}
		<DynamicInput
		  fieldArray={emails}
		  label="Email"
		  inputType="email"
		  placeholder="your@email.com"
		  register={register}
		  fieldName="emails"
		  errors={errors}
		  validation={{ pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i }}
		/>

		{/* addresses */}
		<DynamicInput
		  fieldArray={addresses}
		  label="Address"
		  inputType="text"
		  placeholder="street, city"
		  register={register}
		  fieldName="addresses"
		  errors={errors}
		/>

		{/* categories */}
		<DynamicInput
		  fieldArray={categories}
		  label="Category"
		  inputType="text"
		  placeholder="ie. family, work, school"
		  register={register}
		  fieldName="categories"
		  errors={errors}
		/>

		{/* organization */}
		<div>
		  <label>Organization</label>
		  <input {...register('organisation')} />
		</div>

		{/* website URL */}
		<div>
		  <label>Website URL</label>
		  <input
			{...register('webUrl', { pattern: /https?:\/\/.+/  })}
			className={errors.webUrl ? 'error' : ''}
		  />
		  {errors.webUrl && <span>Invalid URL format</span>}
		</div>

		{/* notes */}
		<div>
		  <label>Notes</label>
		  <textarea {...register('notes')} />
		</div>

		{/* tags */}
		<DynamicInput
		  fieldArray={tags}
		  label="Tag"
		  inputType="text"
		  placeholder="ie. casper's friend, cat-sitter"
		  register={register}
		  fieldName="tags"
		  errors={errors}
		/>

		<button type="submit">Add Contact</button>
	  </form>
	)}
  </>
  );
};
