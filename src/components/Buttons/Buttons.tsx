import { IconButton } from '@mui/joy';
// import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { nanoid } from 'nanoid';
import { type Contact, Phone } from '../../types/contactTypes';
type ContactField = keyof Contact;
type ContactInput = Contact[ContactField];

import { UseFieldArrayRemove, UseFieldArrayAppend } from 'react-hook-form';
import React from 'react';

interface AddFieldProps {
  index?: number;
  fieldName: ContactField;
  append: UseFieldArrayAppend<
    Contact,
    'phones' | 'emails' | 'addresses' | 'categories' | 'tags'
  >;
}

export const AddField: React.FunctionComponent<AddFieldProps> = ({
  fieldName,
  append,
}) => {
  // helper function

  const getDataShape = () => {
    switch (fieldName) {
      case 'phones':
        return { id: nanoid(), phone: '', countryCode: '' } as Phone;
    }
  };

  return (
    <>
      <IconButton onClick={() => append(getDataShape())}>
        <AddIcon fontSize="small"></AddIcon>
      </IconButton>
    </>
  );
};

interface RemoveFieldProps {
  index: number;
  remove: UseFieldArrayRemove;
}

export const RemoveField: React.FunctionComponent<RemoveFieldProps>  = ({index, remove}) => (
  <IconButton onClick={() => remove(index)}>
    <RemoveIcon fontSize="small" />
  </IconButton>
);
