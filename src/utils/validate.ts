/* --- VALIDATION HELPER FUNCTIONS --- */


// validate email and website url
type ValidationType = 'email' | 'url';

export const validateInput = (
  value: string,
  type: ValidationType
): boolean | string => {
  switch (type) {
    case 'email': {
      if (value === '') return true; // account for empty input, not a required field
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailPattern.test(value) || 'Please enter a valid email';
    }

    case 'url': {
      if (value === '') return true;
      const urlPattern =
        /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
      return urlPattern.test(value) || 'Please enter a valid url';
    }

    default:
      return 'Invalid validation type';
  }
};

// format phone numbers to E.164 
import { CountryCode, parsePhoneNumberFromString as parsePhoneNumber } from 'libphonenumber-js';

export const formatToE164 = (input: string, countryCode: CountryCode) => {
	const phoneNumber = parsePhoneNumber(input, countryCode); // expected data shape: {country: 'Hong Kong', dial_code: '+852', code: 'HK'}
	return phoneNumber?.format('E.164') || input;
}


