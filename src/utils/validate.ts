/* --- VALIDATION HELPER FUNCTIONS --- */
// created with the intention to pass thru controller components

type ValidationType = 'email' | 'url';

export const validateInput = (
  value: string,
  type: ValidationType
): boolean | string => {
  switch (type) {
    case 'email': {
      if (value === '') return true; // account for empty input, not a required field
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailPattern.test(value) || 'Please enter a valid email';
    }

    case 'url': {
      if (value === '') return true;
      const urlPattern =
        /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
      return urlPattern.test(value) || 'Please enter a valid url';
    }

    default:
      return 'Invalid validation type';
  }
};
// regex source:

/* email */
