import { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import { nanoid } from '@reduxjs/toolkit';
import { contactAdded } from '../../features/contactList/contactListSlice';

interface ContactCard {
  firstName: string;
  lastName: string;
}

const contactCard: ContactCard = {
  firstName: '',
  lastName: '',
};

export default function AddContact() {
  const [values, setValues] = useState(contactCard);
  const [visibility, setVisibility] = useState(false);

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
    e.preventDefault();

    // console.log('e.currentTarget ', e.currentTarget);
    // console.log('e.currentTarget.elements ', e.currentTarget.elements);
    // console.log('e.currentTarget.firstName ', e.currentTarget.firstName);
    // console.log('e.currentTarget.lastName ', e.currentTarget.lastName);
    
    const firstName = e.currentTarget.firstName.value;
    const lastName = e.currentTarget.lastName.value;
    const newContact: ContactCard = {
      firstName,
      lastName,
    };
    
    dispatch(contactAdded(newContact));

    // const newContactList = useSelector()

    e.currentTarget.reset();

    setVisibility(false);
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
}
