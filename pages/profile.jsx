import { useAlert } from '@/contexts/AlertProvider';
import { useEffect, useState } from 'react';

export default function Profile({}) {
  const showAlert = useAlert();
  const [info, setInfo] = useState({});

  useEffect(() => {
    async function fetchInfo() {
      try {
        const res = await fetch('/api/auth/getUserInfo', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await res.json();
        setInfo(json.data);
      } catch (error) {
        showAlert('error', 'خطا ای پیش آمده');
      }
    }
    fetchInfo();
  }, []);

  // log out handler
  function logoutHandler() {
    console.log('logout');
  }

  return (
    <>
      <button onClick={logoutHandler}>Logout</button>
    </>
  );
}
