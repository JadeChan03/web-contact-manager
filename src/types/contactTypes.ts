import { EntityId } from '@reduxjs/toolkit';

export interface Contact {
	id: EntityId;
	firstName: string;
	lastName: string;
	phones: string[];
	emails: string[];
	addresses: string[];
	categories: string[];
	organisation: string;
	webUrl: string;
	notes: string;
	tags: string[];
}

// note:
// using interface declaration will create an identity (interface name) in compiler errors
// type aliases doesn't create an identity and will be unwinded to show all the properties and nested types it consists of