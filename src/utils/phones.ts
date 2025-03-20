/*** Helper functions to handle "phones" data ***/

/*** Format phone numbers to E.164 ***/
import { CountryCode, parsePhoneNumberFromString as parsePhoneNumber } from 'libphonenumber-js';

export const formatToE164 = (input: string, countryCode: CountryCode) => {
	const phoneNumber = parsePhoneNumber(input, countryCode); // expected result: {country: 'Hong Kong', dial_code: '+852', code: 'HK'}
	return phoneNumber?.format('E.164') || input;
}

