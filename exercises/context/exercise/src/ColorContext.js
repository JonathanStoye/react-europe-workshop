import { createContext } from 'react';

export const defaultColor = '#fc5c65'

export const { Provider, Consumer } = createContext({
  primaryColor: defaultColor
})