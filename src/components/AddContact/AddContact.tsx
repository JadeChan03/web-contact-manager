import { useState } from 'react';

interface ContactCard {
  firstName: string;
  lastName: string;
}

const initialValues: ContactCard = {
  firstName: '',
  lastName: '',
};

export default function AddContact() {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setValues({ ...values, [name]: value });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('initialValues ', initialValues);
    console.log('values ', values);
  };

  return (
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
    </form>
  );
}
