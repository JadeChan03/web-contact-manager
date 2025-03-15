import { useAppDispatch } from "../redux/hooks";
import { Contact } from '../types/contactTypes';
import { UseFormReset } from "react-hook-form";
import { nanoid } from "@reduxjs/toolkit";
import { AppDispatch } from "../redux/types";
import { SetStateAction } from "react";


export const useOnSubmit = ( data: Contact, action: (newContact: Contact) => AppDispatch, setVisibility: React.Dispatch<SetStateAction<boolean>>, reset: UseFormReset<Contact> ) => {
	const dispatch = useAppDispatch();
    const newContact = { ...data, id: nanoid() };
    console.log('newContact ', newContact);
    dispatch(action(newContact));
    setVisibility(false);
    reset();
  };