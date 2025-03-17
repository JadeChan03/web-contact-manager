import { useEffect, useState } from 'react';
import {
  Select,
  Option,
  Box,
  Input,
  FormControl,
  FormHelperText,
} from '@mui/joy';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import LanguageIcon from '@mui/icons-material/Language';
// import CallIcon from '@mui/icons-material/Call';
import { parsePhoneNumberFromString as parsePhoneNumber } from 'libphonenumber-js';
import { type CountryCode } from 'libphonenumber-js';
import { type Contact } from '../../types/contactTypes';
type ContactField = keyof Contact;
import { Control, Controller, useFormContext } from 'react-hook-form';

interface PhoneInputProps {
  index: number;
}

export const PhoneInput: React.FunctionComponent<PhoneInputProps> = ({
  index,
}) => {
  // destructure methods from AddContact form
  const { control, watch, setValue } = useFormContext<Contact>();
  // local state to save current selected country code
  const [countryCodes, setCountryCodes] = useState<Country[]>([]);

  // get current selected country details:
  const currentCountry = watch(`phones.${index}. countryCode`); // 1) selected country dial code ie. '+852
  const currentPhoneValue = watch(`phones.${index}.value`); //  2) user's input phone number ie. 5432-1000

  const validatePhoneNumber = (value: string) => {
    // validate country selection
    // validate number inputs
    // validate country code, accounting for "+" symbol
    // validate phone number via libphonenumber method
  };

  return (
    <Box>
      {/* COUNTRY CODE SELECTOR */}
      <Select></Select>

      {/* PHONE NUMBER INPUT */}
      <Controller
        name={`phones.${index}.value`}
        control={control}
        rules={{
          required: 'Phone number is required',
          validate: validatePhoneNumber, // TODO fix 'validate' type error
        }}
        render={({ field, fieldState }) => (
          <Box sx={{ flexGrow: 1 }}>
            <Input
              {...field}
              type="tel"
              placeholder="Enter phone number"
              error={!!fieldState.error} // same as {fieldState.error ? true : false}
              onChange={(e) => {
                // only allow numbers and '+' via regex
                // format if valid (country code AND raw phone number)
				
              }}
            />
            {/* display errors */}
          </Box>
        )}
      ></Controller>
    </Box>
  );
};
