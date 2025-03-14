import { useState } from 'react';
import { useFieldArray, UseFieldArrayReturn, Control } from 'react-hook-form';
import { type Contact } from '../types/contactTypes';

type ContactField = keyof Contact;

export const useDynamicForm = (initialValues: Contact) => {
  const [values, setValues] = useState<Contact>(initialValues);

  // generic handler for simple inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ 
      ...prev, 
      [name]: value 
    }));
  };

  // handler for dynamic array inputs
  const handleDynamicChange = (
    fieldName: ContactField,
    index: number,
    value: string
  ) => {
    setValues(prev => ({
      ...prev,
      [fieldName]: (prev[fieldName] as string[]).map((item, i) => 
        i === index ? value : item
      )
    }));
  };

  // add new entry to any dynamic array
  const addDynamicField = (
    fieldName: ContactField,
    initialValue = ''
  ) => {
    setValues(prev => ({
      ...prev,
      [fieldName]: [...(prev[fieldName] as string[]), initialValue]
    }));
  };

  // remove entry from any dynamic array
  const deleteDynamicField = (
    fieldName: ContactField,
    index: number
  ) => {
    setValues(prev => ({
      ...prev,
      [fieldName]: (prev[fieldName] as string[]).filter((_, i) => i !== index)
    }));
  };

  return {
    values,
    setValues,
    handleChange,
    handleDynamicChange,
    addDynamicField,
    deleteDynamicField
  };
};