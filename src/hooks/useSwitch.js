import { useState } from 'react';

export default function useSwitch(initialState = false) {
  const [state, setState] = useState(initialState);
  const on = () => setState(true);
  const off = () => setState(false);
  const toggle = () => setState((value) => !value);
  return { value: state, true: on, false: off, toggle };
}
