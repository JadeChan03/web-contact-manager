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
import {
  parsePhoneNumberFromString as parsePhoneNumber,
  type CountryCode,
} from 'libphonenumber-js';
import { type countryCodeData } from '../../types/countryCodeDataTypes';
import { useCountryCodeData } from '../../hooks/useApi';
import { type Contact } from '../../types/contactTypes';
import { Controller, useFormContext } from 'react-hook-form';

interface PhoneInputProps {
  index: number;
}

export const PhoneInput: React.FunctionComponent<PhoneInputProps> = ({
  index,
}) => {
  const { control, setValue, watch } = useFormContext<Contact>();
  const selectedCountryCode = watch(`phones.${index}.countryCode`);
  const phoneValue = watch(`phones.${index}.phone`);
  const countryCodeData: countryCodeData[] = useCountryCodeData();
  const [displayValue, setDisplayValue] = useState('');

  useEffect(() => {
    if (phoneValue) {
      const phoneNumber = parsePhoneNumber(
        phoneValue,
        selectedCountryCode as CountryCode
      );
      if (phoneNumber) {
        setDisplayValue(phoneNumber.nationalNumber);
      } else {
        setDisplayValue(phoneValue);
      }
    }
  }, [phoneValue, selectedCountryCode]);

  const handleCountryChange = (
    value: string,
    field: { onChange: (value: string) => void }
  ) => {
    setValue(`phones.${index}.countryCode`, value as string);
    field.onChange(value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^\d]/g, '');

    // current bug: autofill does not update phone format to E.164 in form field
    if (!selectedCountryCode) alert('Please select country code');

    const phoneNumber = parsePhoneNumber(
      inputValue,
      selectedCountryCode as CountryCode
    );
    if (selectedCountryCode) {
      if (phoneNumber && phoneNumber.isValid()) {
        setDisplayValue(inputValue);
        setValue(`phones.${index}.phone`, phoneNumber.format('E.164'));
      } else {
        setValue(`phones.${index}.phone`, inputValue);
      }
    }
  };

  const validatePhoneNumber = (value: string): boolean | string => {
    const phoneNumber = parsePhoneNumber(
      value,
      selectedCountryCode as CountryCode
    );

    return phoneNumber?.isValid() || 'Invalid phone number';
  };

  return (
    <Box sx={{ minWidth: 375, display: 'flex', gap: 2 }}>
      {/* country code selector */}
      <Controller
        name={`phones.${index}.countryCode`}
        control={control}
        rules={{
          required: 'Required',
        }}
        render={({ field, fieldState }) => (
          <FormControl error={!!fieldState.error}>
            <Select
              {...field}
              value={selectedCountryCode}
              onChange={(_, value) =>
                handleCountryChange(value as string, field)
              }
              startDecorator={<LanguageIcon />}
              slotProps={{
                listbox: {
                  placement: 'bottom-start',
                  sx: { maxWidth: 50 },
                },
              }}
              sx={{ minWidth: 120 }}
            >
              {countryCodeData.map((country) => (
                <Option
                  key={country.code}
                  value={country.code}
                  label={country.dial_code}
                >
                  {country.name} ({country.dial_code})
                </Option>
              ))}
            </Select>
            {fieldState.error && (
              <FormHelperText>
                <InfoOutlined sx={{ mr: 1 }} />
                {fieldState.error.message}
              </FormHelperText>
            )}
          </FormControl>
        )}
      />

      {/* phone number input */}
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
              onChange={(e) => handlePhoneChange(e)}
              error={
                !!fieldState.error /* same as fieldState.error ? true : false */
              } 
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
