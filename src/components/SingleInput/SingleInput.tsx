// import { type ChangeEvent, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormControl, FormHelperText, Input, Box } from '@mui/joy';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import { validateInput } from '../../utils/validate';
import { type Contact } from '../../types/contactTypes';
type DynamicContactKeys =
  | 'firstName'
  | 'lastName'
  | 'organisation'
  | 'webUrl'
  | `emails.${number}.email`;

export interface SingleInputProps {
  fieldName: DynamicContactKeys;
  placeholder: string;
  required: boolean;
  validationType?: 'email' | 'url'; // custom validation function for emails, website
  maxLength?: number;
}

export const SingleInput: React.FunctionComponent<SingleInputProps> = ({
  fieldName,
  placeholder,
  maxLength = 30,
  required = false,
  validationType,
}) => {
  const { control } = useFormContext<Contact>();

  return (
    <Controller
      name={fieldName}
      control={control}
      rules={{
        required: required ? 'Required' : false,
        validate: (value) =>
          validationType ? validateInput(value, validationType) : true,
        maxLength: {
          value: maxLength,
          message: 'Maximum length exceed',
        },
      }}
      render={({ field, fieldState }) => (
        <FormControl error={!!fieldState.error} sx={{width: '100%'}}>
          <Box>
            <Input
              {...field}
              value={field.value as string}
              placeholder={placeholder}
              slotProps={{
                input: {
                  maxLength: maxLength,
                },
              }}
            />
            {fieldState.error && (
              <FormHelperText>
                <InfoOutlined sx={{ mr: 1 }} />
                {fieldState.error.message}q
              </FormHelperText>
            )}
          </Box>
        </FormControl>
      )}
    />
  );
};
