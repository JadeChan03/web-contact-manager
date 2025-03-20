// import { type ChangeEvent, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormControl, FormHelperText, Input, Box } from '@mui/joy';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import { type Contact } from '../../types/contactTypes';
type SingleInputField = Extract<keyof Contact, 'firstName'| 'lastName'| 'organisation'| 'webUrl'>;

export interface SingleInputProps {
  fieldName: SingleInputField
  placeholder: string;
  maxLength?: number;
  required?: boolean; // required fields: firstName, lastName
  validation?: (value: string) => boolean | string; // custom validation function for emails, website
}

export const SingleInput: React.FunctionComponent<SingleInputProps> = ({
  fieldName,
  placeholder,
  maxLength = 30,
  required = false,
  validation,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<Contact>();

  return (
    <FormControl error={!!errors[fieldName]}>
      <Controller
        name={fieldName}
        control={control}
        rules={{
          required: required ? 'This field is required' : false,
          validate: validation,
          maxLength: {
            value: maxLength,
            message: 'Maximum length exceed',
          }
        }}
        render={({ field, fieldState }) => (
          <Box>
            <Input
              {...field}
			  value={field.value as string}
              placeholder={placeholder}
              slotProps={{
                input: {
                  maxLength: maxLength,
                }
              }}
              error={!!fieldState.error}
            />
            {fieldState.error && (
              <FormHelperText>
                <InfoOutlined sx={{ mr: 1 }} />
                {fieldState.error.message}
              </FormHelperText>
            )}
          </Box>
        )}
      />
    </FormControl>
  );
};
