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
    categories: [''],
    organisation: '',
    webUrl: '',
    notes: '',
    tags: [''],
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

  const toggleForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setVisibility(!visibility);
    setValues(initialValues);
  };
  // get 'dispatch' method from the store
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // prevent server submission
    e.preventDefault();

    const {
      firstName,
      lastName,
      phones,
      emails,
      addresses,
      categories,
      organisation,
      webUrl,
      notes,
      tags,
    } = values;

    // create contact card object and dispatch 'contactAdded' action
    const newContact: Contact = {
      id: nanoid(),
      firstName,
      lastName,
      phones,
      emails,
      addresses,
      categories,
      organisation,
      webUrl,
      notes,
      tags,
    };
    console.log('object being dispatched ', newContact);
    // dispatch newContact to contacts state in redux
    dispatch(contactAdded(newContact));
    // close form
    setVisibility(false);
    // // clear input fields
    setValues(initialValues);
  };

  return (
    <>
      <button onClick={toggleForm}>
        {visibility ? 'close form' : 'add new contact'}
      </button>

      {visibility && (
        <form onSubmit={handleSubmit}>
          {/* first name */}
          <div>
            <label>first name</label>
            <input
              name="firstName"
              placeholder="enter first name"
              value={values.firstName}
              onChange={handleChange}
            />
          </div>
          {/* last name */}
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
          {/* categories */}
          <DynamicInput
            fieldName="categories"
            values={values.categories}
            label="categories"
            onChange={handleDynamicChange}
            onAdd={addDynamicField}
            onDelete={deleteDynamicField}
            inputType="text"
            placeholder="ie. family, work, school"
          />
          {/* organisation */}
          <div>
            <label>organisation</label>
            <input
              name="organisation"
              placeholder="enter organisation name"
              value={values.organisation}
              onChange={handleChange}
            />
          </div>
          {/* webUrl */}
          <div>
            <label>website url</label>
            <input
              name="webUrl"
              placeholder="enter website url"
              value={values.webUrl}
              onChange={handleChange}
            />
          </div>
          {/* notes */}
          <div>
            <label>notes</label>
            <input
              name="notes"
              placeholder="enter notes"
              value={values.notes}
              onChange={handleChange}
              type="textarea"
            />
          </div>
          {/* tags */}
          <DynamicInput
            fieldName="tags"
            values={values.tags}
            label="tags"
            onChange={handleDynamicChange}
            onAdd={addDynamicField}
            onDelete={deleteDynamicField}
            inputType="text"
            placeholder="ie. casper's friend, cat-sitter"
          />
          {/* submit button */}
          <button type="submit">add contact</button>
        </form>
      )}
    </>
  );
};
