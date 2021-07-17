import { useState } from 'react';

export default function useInput(initialState = '') {
  const [state, setState] = useState(initialState);
  const set = (value) => setState(value);
  const reset = () => setState('');
  return { value: state, set, reset };
}
