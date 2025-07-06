import { useToken } from '@/contexts/TokenProvider';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function MyProducts() {
  const router = useRouter();
  const [token] = useToken();

  useEffect(() => {
    if (!token) router.replace('/auth/login');
  }, []);

  return <div>MyProducts</div>;
}

export default MyProducts;
