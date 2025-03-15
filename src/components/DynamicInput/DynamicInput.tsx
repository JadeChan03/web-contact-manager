import { Contact } from '../../types/contactTypes';
type ContactField = keyof Contact;
import { FieldValues, FieldArray } from 'react-hook-form';
import { DynamicInputProps } from '../../types/dynamicFormTypes';

export const DynamicInput: React.FC<DynamicInputProps> = ({
  fieldArray,
  label,
  inputType = 'text',
  placeholder = '',
  register,
  fieldName,
  errors,
  validation = {},
}) => {
  const { fields, append, remove } = fieldArray;
  console.log('errors ', errors)

  return (
    <div className="dynamic-section">
      <label>{label}</label>
      {fields.map((field: FieldValues, index: FieldValues) => (
        <div key={field.id} className="dynamic-input-group">
          <input
            type={inputType}
            {...register(`${fieldName}.${index}`as ContactField, validation)}
            placeholder={placeholder}
            className={errors?.[fieldName]?.[index] ? 'error' : ''}
          />
          {fields.length > 1 && (
            <button type="button" onClick={() => remove(index)}>
              x
            </button>
          )}
          {errors?.[fieldName]?.[index] && (
            <span>{errors[fieldName][index].message}</span>
          )}
        </div>
      ))}
      <button type="button" onClick={() => append('')}>
        add {label}
      </button>
    </div>
  );
};
