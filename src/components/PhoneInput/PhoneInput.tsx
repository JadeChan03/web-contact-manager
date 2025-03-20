import { useState } from 'react';
import {
  // Select,
  // Option,

  Box,
  Input,
  FormControl,
  FormHelperText,
  Autocomplete,
  AutocompleteOption,
  ListItemDecorator,
  ListItemContent,
  Typography,
} from '@mui/joy';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
// import LanguageIcon from '@mui/icons-material/Language';
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
  const { control, setValue } = useFormContext<Contact>();

  /* --- LOCAL STATES --- */
  const [countryCode, setCountryCode] = useState(''); // ie. 'US'
  const [countryDialCode, setCountryDialCode] = useState(''); // ie. '+1'
  const [selectedValue, setSelectedValue] = useState<countryCodeData | null>(null); // default to local
  const [displayValue, setDisplayValue] = useState(''); // display phone in UI without country code

  // fetch country code data
  const countryCodeData: countryCodeData[] = useCountryCodeData();


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

      // note: phoneNumber.format('E.164') and phoneNumber.number return the same thing
      console.log('format to E.164 ', phoneNumber.format('E.164')) // chosen for readability
      // console.log('format to number ', phoneNumber.number)

      field.onChange(phoneNumber.format('E.164')); // register INTERNATIONAL number to (react hook) FORM state
    } else {
      const maxLength = 15;
      if (displayVal.length > countryDialCode.length + maxLength) return;

      // set states with formatted number
      setDisplayValue(displayVal);
      setValue(`phones.${index}.phone`, displayVal);
      field.onChange(displayVal);
    }
  };

  /* --- PHONE INPUT VALIDATION --- */
  // TODO - future refactor, place in validate.ts so that function can be reused
  // TODO - consider allowing users to input custom number w/o country code and validation?
  const validatePhoneNumber = (value: string) => {
    const phoneNumber = parsePhoneNumber(
      value,
      countryCode as CountryCode
    );
    return phoneNumber?.isValid() || 'Invalid phone number';
  };

  return (
    <Box sx={{ minWidth: 375, display: 'flex', gap: 2 }}>
      {/* COUNTRY CODE SELECTOR */}

      <Controller
        name={`phones.${index}.countryCode`}
        control={control}
        rules={{
          required: 'Required',
        }}
        render={({ field, fieldState }) => (
          <FormControl error={!!fieldState.error}>
            <Autocomplete
              {...field}
              value={selectedValue}
              placeholder="Country"
              slotProps={{
                input: {
                  autoComplete: 'new-password', // disable autocomplete and autofill
                },
              }}
              sx={{ width: 120 }}
              options={countryCodeData}
              // search by country code, dial code or country name
              getOptionLabel={(option) =>
                `${option.code} ${option.dial_code} ${option.name}`
              }
              onChange={(_, val) => {
                const newVal = val as countryCodeData
                setSelectedValue(newVal);
               field.onChange(newVal?.code || null);
               setCountryDialCode(newVal.dial_code);
               setCountryCode(newVal.code);
              }}
              isOptionEqualToValue={(option, value) => option.code === value?.code}
              renderOption={(props, option) => (
                <AutocompleteOption {...props}>
                  <ListItemDecorator>
                    <img
                      loading="lazy"
                      width="20"
                      srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                      src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                      alt=""
                    />
                  </ListItemDecorator>
                  <ListItemContent sx={{ fontSize: 'sm' }}>
                    <Typography level="body-xs">
                      ({option.code}) {option.dial_code}
                    </Typography>
                  </ListItemContent>
                </AutocompleteOption>
              )}
            />

            {fieldState.error && (
              <FormHelperText>
                <InfoOutlined sx={{ mr: 1 }} />
                {index === 0 ? fieldState.error.message : 'Remove'}
              </FormHelperText>
            )}
          </FormControl>
        )}
      />

      {/* PHONE NUMBER INPUT */}
      <Controller
        name={`phones.${index}.phone`}
        control={control}
        rules={{
          required: 'Required',
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
                {index === 0 ? fieldState.error.message : 'Remove blank fields'}
              </FormHelperText>
            )}
          </FormControl>
        )}
      />
    </Box>
  );
};
