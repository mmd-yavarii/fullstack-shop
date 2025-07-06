import { useToken } from '@/contexts/TokenProvider';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function index() {
  const router = useRouter();
  const [token] = useToken();

  useEffect(() => {
    if (!token) router.replace('/auth/login');
  }, []);

  return <div>index</div>;
}

export default index;
