// import {
//   Control,
//   Controller,
//   useFormContext
//   type Validate,
//   useFieldArray
// } from 'react-hook-form';
// import {type Contact} from '../../types/contactTypes';
// type ContactField = keyof Contact
// import { PhoneInput } from '../PhoneInput/PhoneInput';

// import { Box, Input, IconButton } from '@mui/joy';
// import RemoveIcon from '@mui/icons-material';
// import CloseIcon from '@mui/icons-material/Close';
// import AddIcon from '@mui/icons-material/Add';
// import InfoOutlined from '@mui/icons-material/InfoOutlined';
// import { useFormState } from 'react-dom';

// interface DynamicInputProps {
// 	index: number,
// 	fieldName: ContactField, 
// 	lastEl: boolean
// }

// export const DynamicInput: React.FunctionComponent<DynamicInputProps> = ({index, fieldName, lastEl}) => {
//   // destructure methods from AddContact form
//   const { control, watch, setValue, register } = useFormContext<Contact>();


//   // select input helper function
//   const createInput = () => {
//     switch (fieldName) {
//       case 'phones':
//         return <PhoneInput index={index} />;
//       case 'addresses':
//         return <Input />;
//     }
//   };

//   return (
//     <>
//       <Controller
//         name={`${fieldName}.${index}`}
//         control={control}
//         render={({ field, fieldState }) => (
//           <div className={'dynamic-input-container'}>
//             <Box key={index} sx={{ display: 'flex', gap: 1 }}>
//               {/* create input based on field */}
//               {createInput()}
//               {/* display ADD button instead of REMOVE button on last input */}

//               {lastEl ? 
//                ( <IconButton
// 			  register={register}
// 				aria-label="Remove input"
// 				onClick={() => 
// 					{const {remove} =useFieldArray({control, name:`${fieldName}`});
// 					remove(index)}}
// 				variant="outlined"
// 				>
//                   <RemoveIcon />
//                 </IconButton>
//               ) : (
//                 <IconButton>
//                   <RemoveIcon />
//                 </IconButton>
//               )}

//             </Box>
//           </div>
//         )}
//       />
//     </>
//   );
// };
