import { useToken } from '@/contexts/TokenProvider';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import styles from '@/styles/profile.module.css';

export default function Profile({}) {
  const router = useRouter();
  const [token] = useToken();

  useEffect(() => {
    if (!token) router.replace('/auth/login');
  }, []);

  // log out handler
  function logoutHandler() {
    console.log('logout');
  }

  return (
    <div className={styles.container}>
      <Link href="./profile/add-product">افزودن محصول</Link>
      <Link href="./profile/my-products">لیست محصولات من</Link>
      <Link href="./profile/admin">پنل ادمین</Link>
      <button onClick={logoutHandler}>خروج از حساب کاربی</button>
    </div>
  );
}
