import Cookies from 'js-cookie';
import { createContext, useContext, useEffect, useState } from 'react';

const TokenContext = createContext();

export default function TokenProvider({ children }) {
  const [token, setToken] = useState(() => Cookies.get('token') || '');

  useEffect(() => {
    if (token) {
      Cookies.set('token', token, { expires: 7, sameSite: 'strict' });
    } else {
      Cookies.remove('token');
    }
  }, [token]);

  return <TokenContext.Provider value={[token, setToken]}>{children}</TokenContext.Provider>;
}

export function useToken() {
  const context = useContext(TokenContext);
  return context;
}
