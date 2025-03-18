import { type CountryCode, type CountryCallingCode } from 'libphonenumber-js';

export interface countryCodeData {
  name: string;
  dial_code: CountryCallingCode;
  code: CountryCode;
}
