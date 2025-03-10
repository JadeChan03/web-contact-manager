import { useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { nanoid } from '@reduxjs/toolkit';
import {contactAdded} from '../../redux/slices/contactsSlice';
import { type ContactCard } from '../../types/contactTypes';

export const AddContact = () => {
  const initialValues = { firstName: '', lastName: '' };
  const [values, setValues] = useState(initialValues);
  const [visibility, setVisibility] = useState(false);
  // get 'dispatch' method from the store
  const dispatch = useAppDispatch();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setVisibility(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setValues({ ...values, [name]: value });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    // prevent server submission
    e.preventDefault();

    const firstName = e.currentTarget.firstName.value;
    const lastName = e.currentTarget.lastName.value;

    // create contact card object and dispatch 'contactAdded' action
    const newContact: ContactCard = {
      id: nanoid(),
      firstName,
      lastName,
    };
    dispatch(contactAdded(newContact));

    e.currentTarget.reset();

    // close form
    setVisibility(false);
    // clear input fields
    setValues(initialValues);
  };

  return (
    <>
      <button onClick={handleClick}>add contact</button>

      {visibility ? (
        <form onSubmit={submitHandler}>
          first name:{' '}
          <input
            type="text"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
          ></input>
          last name:{' '}
          <input
            type="text"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
          ></input>
          <button type="submit">submit</button>
        </form>
      ) : (
        <></>
      )}
    </>
  );
};
