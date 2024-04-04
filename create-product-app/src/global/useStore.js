import { useReducer } from 'react';

const initialState = {
  initialized: false,
  idManufacturer: '',
  model: '',
  serialNumber: '',
  localization: '',
  country: '',
  price: '',
  year: '',
  hours: '',
  description: '',
  email: '',
  tlf: '',
  name: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'INITIALIZE':
      return { ...state, initialized: action.value };
    case 'ID_MANUFACTURER':
        return { ...state, idManufacturer: action.value };
    case 'MODEL':
      return { ...state, model: action.value };
    case 'SERIAL_NUMBER':
      return { ...state, serialNumber: action.value };
    case 'LOCALIZATION':
      return { ...state, localization: action.value };
    case 'COUNTRY':
      return { ...state, country: action.value };
    case 'PRICE':
      return { ...state, price: action.value };
    case 'YEAR':
      return { ...state, year: action.value };
    case 'HOURS':
      return { ...state, hours: action.value };
    case 'DESCRIPTION':
        return { ...state, description: action.value };
    case 'EMAIL':
        return { ...state, email: action.value };
    case 'NAME':
        return { ...state, name: action.value };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

function useStore() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return [state, dispatch];
}

export default useStore;