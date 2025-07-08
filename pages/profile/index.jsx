import { useToken } from '@/contexts/TokenProvider';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import styles from '@/styles/profile.module.css';
import Cookies from 'js-cookie';
import { useAlert } from '@/contexts/AlertProvider';

export default function Profile({}) {
  const showAlert = useAlert();
  const router = useRouter();
  const [token] = useToken();

  useEffect(() => {
    if (!token) router.replace('/auth/login');
  }, []);

  // log out handler
  function logoutHandler() {
    const confirmation = confirm('ایا میخواهید از حسابتان خارج شوید ؟');
    if (confirmation) {
      Cookies.remove('token');
      showAlert('success', 'خروج از حساب کاربری با موفقیت انجام شد');
      router.reload('');
    }
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
