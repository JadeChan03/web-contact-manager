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
// import CallIcon from '@mui/icons-material/Call';
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
  // destructure methods from AddContact form
  const { control, watch, setValue } = useFormContext<Contact>();
  console.log('control ', control);

  // LOCAL STATES FOR COUNTRY CODE AND DIAL CODE
  const [countryCode, setCountryCode] = useState(''); // ie. 'US'
  const [countryDialCode, setCountryDialCode] = useState(''); // ie. '+1'

  // WATCH REACT HOOK FORM FIELDS
  const selectedCountryCode = watch(`phones.${index}.countryCode`);
  const phoneValue = watch(`phones.${index}.phone`);

  // FETCH COUNTRY CODES DATA (with custom hook)
  const countryCodeData: countryCodeData[] = useCountryCodeData();
  // console.log('countryCodesData in PhoneInput ', countryCodeData);

  // HANDLE COUNTRY SELECTOR CHANGE
  const handleCountryChange = (
    e: React.SyntheticEvent | null,
    value: string | null
  ) => {
    // update countryCode state onChange ie. 'US'
    // setCountryCode(value);
    console.log('value ', value);
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

  // HANDLE PHONE INPUT CHANGE
  const handlePhoneChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: { onChange: (value: string) => void }
  ) => {
    let { value } = e.target;

    // prevent modification of country dial code
    if (!value.startsWith(countryDialCode)) {
      value = countryDialCode + value.replace(/[^\d]/g, '');
    }
    // allow only numbers and "+" character from country code
    value =
      countryDialCode +
      value.replace(countryDialCode, '').replace(/[^\d]/g, ''); // removes non-digits

    // prevent exceeding max length
    const phoneNumber = parsePhoneNumber(value, countryCode as CountryCode);
    const maxLength = phoneNumber?.country?.length || 15;
    if (value.length > countryDialCode.length + maxLength) return;

    // update phone field in form state
    setValue(`phones.${index}.phone`, value);
    // update field value with updated value
    field.onChange(value);
  };

  // PRESERVE DIAL CODE IN PHONE INPUT FIELD
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // prevent backspace if it deletes dial code
    if (e.key === 'Backspace' && phoneValue?.length <= countryDialCode.length) {
      e.preventDefault();
    }
  };

  // PHONE INPUT VALIDATION
  const validatePhoneNumber = (value: string) => {
    // validate country selection
    if (!selectedCountryCode) return 'Country code is required';
    // validate phone number via libphonenumber method
    const phoneNumber = parsePhoneNumber(value, countryCode as CountryCode);
    return phoneNumber?.isValid() || 'Invalid phone number';
  };

  return (
    <Box sx={{ minWidth: 200, display: 'flex', gap: 2 }}>
      {/* COUNTRY CODE SELECTOR */}
      <Box sx={{ width: 500 }}>
        <Select
          value={countryCode}
          onChange={handleCountryChange}
          startDecorator={<LanguageIcon />}
          slotProps={{
            listbox: {
              placement: 'bottom-start',
              sx: { width: 50 },
            },
          }}
        >
          {countryCodeData.map((country: countryCodeData) => (
            <Option key={country.code} value={country.code}>
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
              value={phoneValue}
              type="tel"
              placeholder="Enter phone number"
              onChange={(e) => handlePhoneChange(e, field)}
              onKeyDown={handleKeyDown}
              error={
                !!fieldState.error
              } /** same as fieldState.error ? true : false **/
              sx={{ width: 275 }}
            />
            {fieldState.error && (
              <FormHelperText>
                <InfoOutlined />
                {fieldState.error.message}
              </FormHelperText>
            )}
          </FormControl>
        )}
      />
    </Box>
  );
};
