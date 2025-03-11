import { useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { nanoid } from '@reduxjs/toolkit';
import { contactAdded } from '../../redux/slices/contactsSlice';
import { type Contact } from '../../types/contactTypes';

export const AddContact = () => {
  const initialValues = {
    firstName: '',
    lastName: '',
    phones: [''], // starts with one empty phone input
  };
  // input value state
  const [values, setValues] = useState(initialValues);
  // visibility state (toggle form)
  const [visibility, setVisibility] = useState(false);
  // get 'dispatch' method from the store
  const dispatch = useAppDispatch();
  // handles addContact button click

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setVisibility(true);
  };
  // updates single input values ie. firstName, lastName
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setValues({ ...values, [name]: value });
  };

  // updates input values w/ the option to add multiple inputs ie. phones
  // update a specific phone number by index
  const handlePhoneChange = (index: number, value: string) => {
    const newPhones = [...values.phones];
    newPhones[index] = value;
    setValues({ ...values, phones: newPhones });
  };

  // add a new empty phone input
  const handleAddPhone = () => {
    setValues({ ...values, phones: [...values.phones, ''] });
  };

  const handleDeletePhone = (index: number) => {
    console.log('delete clicked');
    // remove current phone from new phone list
    const filteredPhones = values.phones.filter((_, i) => i !== index);
    console.log('filteredPhones ', filteredPhones);
    console.log('index ', index);
    setValues({ ...values, phones: filteredPhones });
    console.log('values ', values);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    // prevent server submission
    e.preventDefault();

    // string
    const firstName = e.currentTarget.firstName.value;
    const lastName = e.currentTarget.lastName.value;
    // an array
    const phones = e.currentTarget.phones.value;

    // create contact card object and dispatch 'contactAdded' action
    const newContact: Contact = {
      id: nanoid(),
      firstName,
      lastName,
      phones,
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
          <br/>
          <label>first name:</label>
          <input
            type="text"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            required={true}
          ></input>
          <br/>
          <label>last name:</label>
          <input
            type="text"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
            required={true}
          ></input>
          <br/>
          <label>phone: </label>
          {values.phones.map((phone, index) => (
            <>
              <br/>
              <input
                key={index}
                type="tel"
                name="phones"
                value={values.phones[index]}
                onChange={(e) => handlePhoneChange(index, e.target.value)}
                placeholder="phone number"
                required={true}
              ></input>

              {/* show delete button only when multiple phones exist */}
              {values.phones.length > 1 && (
                <button type="button" onClick={() => handleDeletePhone(index)}>
                  Delete
                </button>
              )}
            </>
          ))}
          <button onClick={handleAddPhone}> add phone </button>
          <></>
          <br/>
          <button type="submit">submit</button>
        </form>
      ) : (
        <></>
      )}
    </>
  );
};
