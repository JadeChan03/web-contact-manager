import { EntityId } from '@reduxjs/toolkit';

export interface Contact {
  id: EntityId;
  firstName: string;
  lastName: string;
  phones: {
    id: string;
    phone: string; // full E.164 number, ie. +18880001111
    countryCode: string; // ISO country code, ie. 'CA'
  }[];
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
// export interface Contact {
// 	id: EntityId;
// 	firstName: string;
// 	lastName: string;
// 	phones: {id: string, value: string}[];
// 	emails: {id: string, value: string}[];
// 	addresses: {id: string, value: string}[];
// 	categories: {id: string, value: string}[];
// 	organisation: string;
// 	webUrl: string;
// 	notes: string;
// 	tags: {id: string, value: string}[];
// }

// note:
// using interface declaration will create an identity (interface name) in compiler errors
// type aliases doesn't create an identity and will be unwinded to show all the properties and nested types it consists of
