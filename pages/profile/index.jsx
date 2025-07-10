import { verify } from 'jsonwebtoken';

import Link from 'next/link';

import styles from '@/styles/profile.module.css';
import Cookies from 'js-cookie';
import { useAlert } from '@/contexts/AlertProvider';
import { useRouter } from 'next/router';

export default function Profile({ info }) {
  const showAlert = useAlert();
  const router = useRouter();

  // log out handler
  function logoutHandler() {
    const confirmation = confirm('ایا میخواهید از حسابتان خارج شوید ؟');
    if (confirmation) {
      Cookies.remove('token');
      showAlert('success', 'خروج از حساب کاربری با موفقیت انجام شد');
      router.replace('/');
    }
  }

  return (
    <div className={styles.container}>
      <Link href="./profile/add-product">افزودن محصول</Link>
      <Link href="./profile/my-products">لیست محصولات من</Link>
      {info.role == 'admin' && <Link href="./profile/admin">پنل ادمین</Link>}
      <button onClick={logoutHandler}>خروج از حساب کاربی</button>
    </div>
  );
}

export async function getServerSideProps(context) {
  const cookies = context.req.headers.cookie || '';
  const token = cookies
    .split('; ')
    .find((c) => c.startsWith('token='))
    ?.split('=')[1];

  if (!token) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  try {
    const decoded = verify(token, process.env.SECRET_KEY);

    return {
      props: {
        info: JSON.parse(JSON.stringify(decoded)),
      },
    };
  } catch (error) {
    console.log('JWT verification error:', error.message);
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }
}
