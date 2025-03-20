import { EntityId } from '@reduxjs/toolkit';

export interface Contact {
  id: EntityId;
  firstName: string; // SINGLE INPUT, 
  lastName: string; // SINGLE INPUT
  phones: Phone[];
  emails:Email[]; 
  addresses: Address[];
  categories: Category[];
  organisation: string; // SINGLE INPUT
  webUrl: string; // SINGLE INPUT
  notes: string; // SINGLE INPUT, custom component
  tags: Tag[];
}

export interface Phone {
  id: string;
  phone: string;
  countryCode: string;
}

export interface Email {
  id: string;
  email: string;
}

// TODO: implement more international-friendly format, currently based on US standard addreses
export interface Address {
  id: string;
    addr1: string;
    addr2?: string;
    addr3?: string;
    city: string;
    state?: string;
    zip?: string;
}

export interface Category {
  id: string;
  category: string;
}

export interface Tag {
  id: string;
  tag: string;
}

// note:
// * using interface declaration will create an identity (interface name) in compiler errors
// * type aliases doesn't create an identity and will be unwinded to show all the properties and nested types it consists of
// * all "id" fields will be uniquely generated by "nanoid()"
