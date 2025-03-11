// import { useState } from 'react';

// export const Input = ({label}) => {
// 	const inputInitialState = {
// 		label: 'label',
// 		type: 'type',
// 		value: ''

// 	}

// 	const inputs = [];
 
//   // reads input field/label
//   // reads input type
//   // addInput btn adds a new BLANK input to inputs array 
//   // when users fill in input, the input obj updates in the array

//   return (
//     <div className="input-group">
//       <label htmlFor={label}>{label}</label>
//       <div className="input">
//         {inputs.map((input) => (
//           <input
//             type={type || 'text'}
//             id={label}
//             value={value || ''}
//             onChange={(e) => onChange(e, index)}
//           />
//         ))}

//         <button>add input</button>
//       </div>
//     </div>
//   );
// };
