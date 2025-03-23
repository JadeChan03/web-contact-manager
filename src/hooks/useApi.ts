/* Custom API Hooks */
import { useState, useEffect } from 'react';
import { get } from '../utils/api';

// GET Country Codes - for fetching from
export const useCountryCodeData = () => {
  const [data, setData] = useState([]); // expecting array of objects

  useEffect(() => {
    const fetchCountryCodeData = async () => {
      try {
        const result = await get(
          'https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/f77e7598a8503f1f70528ae1cbf9f66755698a16/CountryCodes.json'
        );
        // console.log('result: ', result);
        // data shape = {name, dial_code, code}
        setData(result);
      } catch (err) {
        console.error('Error fetching countryCodes ', err);
      }
    };
    fetchCountryCodeData();
  }, []);
  return data;
};



// TODO - getContacts -> render with pagination logic?

// TODO - postContacts
