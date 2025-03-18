// import { useEffect, useState } from 'react';
// import {
//   Select,
//   Option,
//   Box,
//   Input,
//   FormControl,
//   FormHelperText,
// } from '@mui/joy';
// import InfoOutlined from '@mui/icons-material/InfoOutlined';
// import LanguageIcon from '@mui/icons-material/Language';
// // import CallIcon from '@mui/icons-material/Call';
// import { parsePhoneNumberFromString as parsePhoneNumber } from 'libphonenumber-js';
// import { type CountryCode } from 'libphonenumber-js';
// import { type Contact } from '../../types/contactTypes';
// type ContactField = keyof Contact;
// import { Control, Controller } from 'react-hook-form';

// interface PhoneInputProps {
//   fieldName: ContactField;
//   index: number;
//   control: Control<Contact>;
//   defaultValue: string;
// }

// export const PhoneInput: React.FunctionComponent<PhoneInputProps> = ({
//   fieldName,
//   index,
//   control,
//   defaultValue,
// }) => {
//   const [countryCodes, setCountryCodes] = useState<
//     { name: string; dial_code: string; code: string }[]
//   >([]);
//   const [selectedDialCode, setSelectedDialCode] = useState<string>('');
//   const [selectedCode, setSelectedCode] = useState<CountryCode>(
//     '' as CountryCode
//   );
//   const [plainPhoneNumber, setPlainPhoneNumber] = useState<string>(''); // tel without country code
//   const [displayValue, setDisplayValue] = useState<string>('');

//   useEffect(() => {
//     const fetchCountryCodes = async () => {
//       const response = await fetch(
//         'https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/f77e7598a8503f1f70528ae1cbf9f66755698a16/CountryCodes.json'
//       );
//       const data = await response.json();
//       setCountryCodes(data);
//     };
//     fetchCountryCodes();
//   }, []);

//   // null is needed in setting type params or "onChange" attribute on Select component will throw errors
//   const handlePhoneChange = (
//     _: React.SyntheticEvent | null,
//     newValue: string | null
//   ) => {
//     const country = countryCodes.find((country) => country.code === newValue);
//     if (country) {
//       setSelectedDialCode(country.dial_code);
//       setSelectedCode(newValue as CountryCode);
//       setPlainPhoneNumber('');
//       setDisplayValue(country.dial_code);
//     }
//   };

//   const validatePhoneNumber = (value: string) => {
//     if (!selectedCode) return 'Country code is required';
//     if (!value) return 'Phone number is required';

//     const phoneNumber = parsePhoneNumber(value, selectedCode);
//     return phoneNumber?.isValid() || 'Invalid phone number';
//   };

//   return (
//     <Box sx={{ minWidth: '160px', display: 'flex' }}>
//       <Box sx={{ width: 80 }}>
//         <Select
//           value={selectedCode}
//           onChange={handlePhoneChange}
//           startDecorator={<LanguageIcon />}
//           // endDecorator={<CallIcon/>}
//           // sx={{maxWidth:'30px'}}
//           slotProps={{
//             listbox: {
//               placement: 'bottom-start',
//               sx: { minWidth: 160 },
//             },
//           }}
//         >
//           {countryCodes.map((country) => (
//             <Option key={country.code} value={country.code}>
//               {country.name} ({country.dial_code})
//             </Option>
//           ))}
//         </Select>
//       </Box>

//       <Controller
//         name={`${fieldName}.${index}.value`}
//         control={control}
//         defaultValue={defaultValue}
//         rules={{
//           required: 'Phone number required',
//           validate: validatePhoneNumber,
//         }}
//         render={({ field, fieldState }) => (
//           <FormControl error={fieldState.error ? true : false}>
//             <Input
//               /* TODO - make number field, validate is number but account for "+" */
//               {...field}
//               value={displayValue}
//               placeholder={`Add phone number`}
//               onChange={(e) => {
//                 const inputValue = e.target.value;

//                 // update plain phone number and prevent backspacing into the dial code
//                 if (
//                   inputValue.length < selectedDialCode.length &&
//                   inputValue.startsWith('+')
//                 ) {
//                   setPlainPhoneNumber('');
//                   setDisplayValue(selectedDialCode);
//                 } else {
//                   setPlainPhoneNumber(inputValue.replace(selectedDialCode, '')); // Store raw number without dial code
//                   const fullNumber = `${selectedDialCode}${inputValue.replace(selectedDialCode, '')}`;

//                   // parse and format if input is valid
//                   const phoneNumberParsed = parsePhoneNumber(
//                     fullNumber,
//                     selectedCode
//                   );
//                   console.log('phoneNumberParsed ', phoneNumberParsed);
//                   const formattedValue = phoneNumberParsed
//                     ? phoneNumberParsed.formatInternational()
//                     : inputValue;

//                   setDisplayValue(formattedValue); // update display value

//                   field.onChange(formattedValue); // update field value with updatedValue
//                 }
//               }}
//             />
//             {fieldState.error && (
//               <FormHelperText>
//                 <InfoOutlined />
//                 {fieldState.error.message}
//               </FormHelperText>
//             )}
//           </FormControl>
//         )}
//       />
//     </Box>
//   );
// };
