import { EntityId } from '@reduxjs/toolkit';

export interface Contact {
  id: EntityId;
  firstName: string;
  lastName: string;
  phones: Phone[];
  emails: {
    id: string;
    email: string;
  }[];
  // TODO: implement more international-friendly format, currently based on US standard addresses
  addresses: {
    id: string;
    addr1: string;
    addr2?: string;
    addr3?: string;
    city: string;
    state?: string;
    zip?: string;
  }[];
  categories: {
    id: string;
    category: string;
  }[];
  organisation: string;
  webUrl: string;
  notes: string;
  tags: {
    id: string;
    tag: string;
  }[];
}
export interface Phone {
  id: string; // index of phone object in phones array
  phone: string;
  countryCode: string;
}


// note:
// using interface declaration will create an identity (interface name) in compiler errors
// type aliases doesn't create an identity and will be unwinded to show all the properties and nested types it consists of
