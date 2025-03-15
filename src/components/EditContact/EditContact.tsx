import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { contactUpdated } from '../../redux/slices/contactsSlice';
import { ContactCard } from '../ContactCard/ContactCard';
import { DynamicInput } from '../DynamicInput/DynamicInput';
import { Contact } from '../../types/contactTypes';
import { selectContactById } from '../../redux/slices/contactsSlice';
import { useEffect } from 'react';

export const EditContact = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // get contact from Redux store using URL parameter ID
  const contact = useAppSelector((state) => selectContactById(state, id || ''));

  const {
    control,
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm<Contact>({
    defaultValues: contact || undefined,
  });

  // reset form when contact loads/changes
  useEffect(() => {
    if (contact) reset(contact);
  }, [contact, reset]);

  const onSubmit = (data: Contact) => {
    if (!id) return;
    dispatch(contactUpdated({ ...data, id }));
    navigate(`/contacts/${id}`);
  };

  if (!contact) {
    return <div>contact not found</div>;
  }

  const formValues = watch();

  return (
    <div className="edit-contact-container">
      <form onSubmit={handleSubmit(onSubmit)} className="edit-form">
        <h2>Edit Contact</h2>

        {/* first name */}
        <div className="form-section">
          <label>
            first name:
            <input
              {...register('firstName', { required: 'First name is required' })}
              className={errors.firstName ? 'error' : ''}
            />
            {errors.firstName && (
              <span className="error-message">{errors.firstName.message}</span>
            )}
          </label>
        </div>

        {/* last name */}
        <div className="form-section">
          <label>
            last name:
            <input
              {...register('lastName', { required: 'Last name is required' })}
              className={errors.lastName ? 'error' : ''}
            />
            {errors.lastName && (
              <span className="error-message">{errors.lastName.message}</span>
            )}
          </label>
        </div>

        {/* dynamic inputs */}
        <DynamicInput
          control={control}
          label="phone"
          inputType="tel"
          placeholder="+852 1234-5678"
          register={register}
          fieldName="phones"
          errors={errors}
          validation={{
            pattern: {
              value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
              message: 'Invalid phone number',
            },
          }}
        />

        <DynamicInput
          control={control}
          label="email"
          inputType="email"
          placeholder="your@email.com"
          register={register}
          fieldName="emails"
          errors={errors}
          validation={{
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          }}
        />

        <DynamicInput
          control={control}
          label="address"
          inputType="text"
          placeholder="street, city"
          register={register}
          fieldName="addresses"
          errors={errors}
        />

        {/* other fields */}

        <div className="form-actions">
          <button type="submit">save changes</button>
          <button type="button" onClick={() => navigate(-1)}>
            cancel
          </button>
        </div>
      </form>

      <div className="preview-section">
        <h3>preview</h3>
        <ContactCard contact={formValues} />
      </div>
    </div>
  );
};
