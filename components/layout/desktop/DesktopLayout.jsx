import Link from 'next/link';
import styles from './DesktopLayout.module.css';
import { useRouter } from 'next/router';
import { useToken } from '@/contexts/TokenProvider';
import SearchAndSort from '@/components/module/SearchAndSort';
import { useEffect, useState } from 'react';

function DesktopLayout() {
  const { asPath: path, pathname } = useRouter();
  const [token] = useToken();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className={styles.nav}>
      {pathname === '/' && (
        <div className={styles.inputContainer}>
          <SearchAndSort />
        </div>
      )}

      <div className={styles.linkContainer}>
        <Link href={!token ? '/auth/login' : '/chat'} className={`${styles.link} ${path == '/chat' && styles.selected}`}>
          پیام
        </Link>

        <Link href={!token ? '/auth/login' : '/bookmark'} className={`${styles.link} ${path == '/bookmark' && styles.selected}`}>
          ذخیره شده ها
        </Link>

        <Link href={!token ? '/auth/login' : '/cart'} className={`${styles.link} ${path == '/cart' && styles.selected}`}>
          سبد خرید
        </Link>

        <Link href="/" className={`${styles.link} ${pathname == '/' && styles.selected}`}>
          خانه
        </Link>
      </div>

      {token ? (
        <Link href="/profile" className={`${styles.profile} ${styles.link} ${path == '/profile' && styles.selected}`}>
          پروفایل
        </Link>
      ) : (
        <Link href="/auth/login" className={`${styles.profile} ${styles.link} ${path == '/auth/login' && styles.selected}`}>
          ورود / ثبت‌نام
        </Link>
      )}
    </div>
  );
}

export default DesktopLayout;
