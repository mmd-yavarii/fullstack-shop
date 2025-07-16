import { verify } from 'jsonwebtoken';

import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from '@/styles/profile.module.css';

import { useAlert } from '@/contexts/AlertProvider';
import { useState } from 'react';
import { BeatLoader } from 'react-spinners';

export default function Profile({ info }) {
  const showAlert = useAlert();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // log out handler
  async function logoutHandler() {
    const confirmation = confirm('آیا می‌خواهید از حساب کاربری خارج شوید؟');
    if (!confirmation) return;

    try {
      setIsLoading(true);
      const response = await fetch('/api/auth/logout');
      const result = await response.json();
      showAlert(response.status, result.message);
      if (response.ok) {
        router.replace('/');
      }
    } catch (error) {
      console.error(error);
      showAlert('error', 'خطا در برقراری ارتباط با سرور');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <p>{info.name}</p>
        <p>{info.phone}</p>
      </div>

      <Link href="./profile/add-product">افزودن محصول</Link>
      <Link href="./profile/my-products">لیست محصولات من</Link>
      {info.role == 'admin' && <Link href="./profile/admin">پنل ادمین</Link>}
      <button onClick={logoutHandler}>{isLoading ? <BeatLoader size="0.6rem" color="#ea2b2b" /> : 'خروج از حساب کاربی'}</button>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { token } = context.req.cookies;

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
