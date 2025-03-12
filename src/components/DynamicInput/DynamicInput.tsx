import { type DynamicInputProps } from '../../types/dynamicFormTypes';

export const DynamicInput: React.FC<DynamicInputProps> = ({
  fieldName,
  values,
  label,
  onChange,
  onAdd,
  onDelete,
  inputType = 'text',
  placeholder = '',
  addButtonText = `add ${label}`,
  showRemove = true,
}) => {
  return (
    <div className="dynamic-section">
      <label>{label}</label>
      {values.map((value, index) => (
        <div key={`${fieldName}-${index}`} className="dynamic-input-group">
          <input
            type={inputType}
            value={value}
            onChange={(e) => onChange(fieldName, index, e.target.value)}
            placeholder={placeholder}
            aria-label={`${label} ${index + 1}`}
          />

          {showRemove && values.length > 1 && (
            <button
              type="button"
              onClick={() => onDelete(fieldName, index)}
              className="remove-button"
              aria-label={`remove ${label} ${index + 1}`}
            >
              &times;
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={() => onAdd(fieldName)}
        className="add-button"
      >
        {addButtonText}
      </button>
    </div>
  );
};

export default DynamicInput;