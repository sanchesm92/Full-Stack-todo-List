import { useState } from 'react';
import context from './context';

export default function Provider({ children }) {
  const [darkMode, setDarkMode] = useState(true);

  const value = {
    darkMode,
    setDarkMode
  };
  return (
    <context.Provider value={ value }>
      {children}
    </context.Provider>
  );
}