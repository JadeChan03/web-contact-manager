import { useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { nanoid } from '@reduxjs/toolkit';
import { contactAdded } from '../../redux/slices/contactsSlice';
import { type Contact } from '../../types/contactTypes';
import { useDynamicForm } from '../../hooks/useDynamicForm';
import { DynamicInput } from '../DynamicInput/DynamicInput';

export const AddContact = () => {
  const initialValues = {
    id: '',
    firstName: '',
    lastName: '',
    phones: [''],
    emails: [''],
    addresses: [''],
  };
  const {
    values,
    setValues,
    handleChange,
    handleDynamicChange,
    addDynamicField,
    deleteDynamicField,
  } = useDynamicForm(initialValues);

  // visibility state (toggle form)
  const [visibility, setVisibility] = useState(false);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setVisibility(true);
  };
  // get 'dispatch' method from the store
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // prevent server submission
    e.preventDefault();

    const { firstName, lastName, phones, emails, addresses } = values;

    // create contact card object and dispatch 'contactAdded' action
    const newContact: Contact = {
      id: nanoid(),
      firstName,
      lastName,
      phones,
      emails,
      addresses,
    };
    console.log('object being dispatched ', newContact);
    dispatch(contactAdded(newContact));

    e.currentTarget.reset();

    // close form
    setVisibility(false);

    // // clear input fields
    setValues(initialValues);
  };

  return (
    <>
      <button onClick={handleClick}>add contact</button>

      {visibility && (
        <form onSubmit={handleSubmit}>
          {/* simple inputs */}
          <div>
          <label>first name</label>
          <input
            name="firstName"
            placeholder="enter first name"
            value={values.firstName}
            onChange={handleChange}
          />
          </div>
          <div>
          <label>last name</label>
          <input
            name="lastName"
            placeholder="enter last name"
            value={values.lastName}
            onChange={handleChange}
          />
          </div>
          {/* phone numbers */}
          <DynamicInput
          fieldName="phones"
          values={values.phones}
          label="phone"
          onChange={handleDynamicChange}
          onAdd={addDynamicField}
          onDelete={deleteDynamicField}
          inputType="tel"
          placeholder="+852 1234-5678"
          />
          {/* emails */}
          <DynamicInput
          fieldName="emails"
          values={values.emails}
          label="email"
          onChange={handleDynamicChange}
          onAdd={addDynamicField}
          onDelete={deleteDynamicField}
          inputType="email"
          placeholder="your@email.com"
          />
          {/* addresses */}
          <DynamicInput
            fieldName="addresses"
            values={values.addresses}
            label="address"
            onChange={handleDynamicChange}
            onAdd={addDynamicField}
            onDelete={deleteDynamicField}
            inputType="textarea"
            placeholder="street, city"
          />

          {/* submit button */}
          <button type="submit">Submit</button>
        </form>
      )}
    </>
  );
};
