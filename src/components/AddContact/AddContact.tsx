import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { update } from '../../features/contactCard/contactCardSlice';

interface contactCard {
  firstName: string;
  lastName: string;
}

const contactCard: contactCard = {
  firstName: '',
  lastName: '',
};

export default function AddContact() {
  const [values, setValues] = useState(contactCard);
  const [visibility, setVisibility] = useState(false);

  // const contactCard = useSelector(());
  const dispatch = useDispatch();

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
    console.log('ContactCard ', ContactCard);
    console.log('values ', values);

    dispatch(update(contactCard));

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
