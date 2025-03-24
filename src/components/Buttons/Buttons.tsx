import { IconButton } from '@mui/joy';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  type Contact,
  Phone,
  Email,
  Address,
  Category,
  Tag,
} from '../../types/contactTypes';
type ContactField = keyof Contact;

import { UseFieldArrayRemove, UseFieldArrayAppend } from 'react-hook-form';
import React from 'react';

interface AddFieldProps {
  index?: number;
  fieldName?: ContactField;
  append: UseFieldArrayAppend<
    Contact,
    'phones' | 'emails' | 'addresses' | 'categories' | 'tags'
  >;
  dataShape: Phone | Email | Address | Category | Tag | (Phone | Email | Address | Category | Tag)[]
  disabled?: boolean;
}

export const AddField: React.FunctionComponent<AddFieldProps> = ({
  append,
  dataShape,
  disabled = false,
}) => {


  return (
    <>
      <IconButton onClick={() => append(dataShape)} disabled={disabled}>
        <AddIcon fontSize="small"></AddIcon>
      </IconButton>
    </>
  );
};

interface RemoveFieldProps {
  index: number;
  remove: UseFieldArrayRemove;
  disabled?: boolean;
}

export const RemoveField: React.FunctionComponent<RemoveFieldProps> = ({
  index,
  remove,
  disabled = false,
}) => (
  <IconButton
    disabled={disabled}
    onClick={() => remove(index)}
    sx={{ maxHeight: 20 }}
  >
    <RemoveIcon fontSize="small" />
  </IconButton>
);
