import Alert from '@/components/module/Alert';
import { createContext, useContext, useEffect, useState } from 'react';

const AlertContext = createContext();

export default function AlertProvider({ children }) {
  const [isAlert, setIsAlert] = useState(false);
  const [type, setType] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!isAlert) return;
    const timeout = setTimeout(() => setIsAlert(false), 4000);
    return () => clearTimeout(timeout);
  }, [isAlert]);

  return (
    <AlertContext.Provider value={{ setType, setMessage, setIsAlert }}>
      <Alert type={type} message={message} setIsAlert={setIsAlert} isAlert={isAlert} />
      {children}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const { setType, setMessage, setIsAlert } = useContext(AlertContext);

  return (type, message) => {
    setIsAlert(true);
    setType(type);
    setMessage(message);
  };
}
