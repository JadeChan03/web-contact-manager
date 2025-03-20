import { useState } from 'react';
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
import {
  parsePhoneNumberFromString as parsePhoneNumber,
  // type CountryCallingCode,
  type CountryCode,
} from 'libphonenumber-js';
import { type countryCodeData } from '../../types/countryCodeDataTypes';
import { useCountryCodeData } from '../../hooks/useApi';
import { type Contact } from '../../types/contactTypes';
// type ContactField = keyof Contact;
import { Controller, useFormContext } from 'react-hook-form';

interface PhoneInputProps {
  index: number;
}

export const PhoneInput: React.FunctionComponent<PhoneInputProps> = ({
  index,
}) => {
  /* --- destructure methods from AddContact form --- */
  const { control, watch, setValue } = useFormContext<Contact>();

  /* --- LOCAL STATES --- */
  const [countryCode, setCountryCode] = useState(''); // ie. 'US'
  const [countryDialCode, setCountryDialCode] = useState(''); // ie. '+1'
  const [displayValue, setDisplayValue] = useState(''); // display in UIwithout country code

  /* --- WATCH REACT HOOK FORM FIELDS --- */
  const selectedCountryCode = watch(`phones.${index}.countryCode`);
  // const phoneValue = watch(`phones.${index}.phone`);

  /* --- FETCH COUNTRY CODES DATA (with custom hook) --- */
  const countryCodeData: countryCodeData[] = useCountryCodeData();
  // console.log('countryCodesData in PhoneInput ', countryCodeData);

  /* --- HANDLE COUNTRY SELECTOR CHANGE --- */
  const handleCountryChange = (
    e: React.SyntheticEvent | null,
    value: string | null
  ) => {
    // update countryCode state onChange ie. 'US'
    // setCountryCode(value);
    // console.log('value ', value);
    //validate countryCode, returns countryCodeData object {name, dial_code, code}

    const countryObj = countryCodeData.find((c) => c.code === value);
    console.log('countryObj ', countryObj);
    // if valid, update LOCAL country code and dial code state
    if (countryObj) {
      setCountryCode(value as string); // ie. 'US'
      setCountryDialCode(countryObj.dial_code); // ie. '+1
      setValue(`phones.${index}.countryCode`, value as string); // update form state country code
    }
  };

  /* --- HANDLE PHONE INPUT CHANGE --- */
  const handlePhoneChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: { onChange: (value: string) => void }
  ) => {
    let displayVal = e.target.value;

    // remove non-digits
    displayVal = displayVal.replace(/[^\d]/g, '');

    // validate phone number
    const phoneNumber = parsePhoneNumber(
      displayVal,
      countryCode as CountryCode
    );
    // console.log('phoneNumber', phoneNumber);
    if (phoneNumber) {
      // prevent exceeding maxLength, TODO - consider making helper function so logic is reusable
      const maxLength = phoneNumber.nationalNumber.length;
      if (displayVal.length > countryDialCode.length + maxLength) return; // 

      // set states with formatted number
      setDisplayValue(phoneNumber.nationalNumber); // update NATIONAL number to displayVal state
      setValue(`phones.${index}.phone`, phoneNumber.nationalNumber); // update NATIONAL number to FIELD state
      
      // note: these return the same formats
      console.log('format to E.164 ', phoneNumber.format('E.164')) // chosen for readability
      console.log('format to number ', phoneNumber.number)

      field.onChange(phoneNumber.format('E.164')); // register INTERNATIONAL number to (react hook) FORM state
    } else {
      const maxLength = 15;
      // prevent exceeding maxLength
      if (displayVal.length > countryDialCode.length + maxLength) return;

      // set states with formatted number
      setDisplayValue(displayVal);
      setValue(`phones.${index}.phone`, displayVal);
    }
  };

  /* --- PHONE INPUT VALIDATION --- */
  const validatePhoneNumber = (value: string) => {
    // note: allow users to input custom number w/o country code and validation?

    // validate country selection
    if (!selectedCountryCode) return 'Country code is required';
    // validate phone number via libphonenumber method
    const phoneNumber = parsePhoneNumber(value, countryCode as CountryCode);
    return phoneNumber?.isValid() || 'Invalid phone number';
  };

  return (
    <Box sx={{ minWidth: 375, display: 'flex', gap: 2 }}>
      {/* COUNTRY CODE SELECTOR */}
      <Box>
        <Select
          value={countryCode}
          // placeholder={''}
          onChange={handleCountryChange}
          startDecorator={<LanguageIcon />}
          slotProps={{
            listbox: {
              placement: 'bottom-start',
              sx: { maxWidth: 50 },
            },
          }}
          sx={{ minWidth: 120 }}
        >
          {countryCodeData.map((country: countryCodeData) => (
            <Option
              key={country.code}
              value={country.code}
              label={country.dial_code}
            >
              {country.name} ({country.dial_code})
            </Option>
          ))}
        </Select>
      </Box>

      {/* PHONE NUMBER INPUT */}
      <Controller
        name={`phones.${index}.phone`} // expecting string "phone", receiving string "phone" but not reading properly
        control={control} // expecting Control<Contact>, but receiving 'Control<{ id: string; phone: string; countryCode: string; }>'
        rules={{
          required: 'Please complete the field',
          validate: validatePhoneNumber,
        }}
        render={({ field, fieldState }) => (
          <FormControl error={!!fieldState.error}>
            <Input
              {...field}
              value={displayValue}
              type="tel"
              placeholder="Enter phone number"
              onChange={(e) => handlePhoneChange(e, field)}
              // onKeyDown={handleKeyDown}
              error={
                !!fieldState.error
              } /** same as fieldState.error ? true : false **/
              sx={{ minWidth: 240 }}
            />
            {fieldState.error && (
              <FormHelperText>
                <InfoOutlined sx={{ mr: 1 }} />
                {fieldState.error.message}
              </FormHelperText>
            )}
          </FormControl>
        )}
      />
    </Box>
  );
};
