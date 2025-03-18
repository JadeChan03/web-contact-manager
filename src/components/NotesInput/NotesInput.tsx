import { type ChangeEvent, useState } from 'react';
import { type Contact } from '../../types/contactTypes';
import {
  FormControl,
  FormHelperText,
  Textarea,
  Typography,
  Box,
} from '@mui/joy';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import { Controller, useFormContext, type FieldValues } from 'react-hook-form';

export interface NotesInputProps {
  maxLength: number;
  placeholder: string;
}

export const NotesInput: React.FunctionComponent<NotesInputProps> = ({
  maxLength,
  placeholder,
}) => {
  const { control, watch, setValue } = useFormContext<Contact>();

  const notesValue = watch('notes') || '';
  // local 'notes' input value state, neccesarry for rendering current input in component
  const [localNotes, setLocalNotes] = useState(notesValue);

  console.log('localNotes ', localNotes);
  console.log('notesValue ', notesValue);

  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement>,
    field: FieldValues
  ) => {
    const { value } = e.target;
    console.log('value ', value);
    const newValue =
      value.length <= maxLength ? value : value.slice(0, maxLength);

    setLocalNotes(newValue);
    setValue('notes', newValue);

    // update react hook form
    field.onChange(newValue);
  };

  return (
    <FormControl
      error={localNotes && localNotes.length >= maxLength ? true : false}
    >
      <Controller
        name="notes"
        control={control}
        render={({ field }) => (
          <Box>
            <Textarea
              {...field}
              value={localNotes}
              onChange={(e) => handleChange(e, field)}
              placeholder={placeholder}
              endDecorator={
                <Typography level="body-xs" sx={{ ml: 'auto' }}>
                  {localNotes.length}/200
                </Typography>
              }
              sx={{ minHeight: '100px' }}
            />
            {localNotes.length >= maxLength && (
              <FormHelperText>
                <InfoOutlined sx={{ mr: 1 }} />
                Character limited reached
              </FormHelperText>
            )}
          </Box>
        )}
      />
    </FormControl>
  );
};
