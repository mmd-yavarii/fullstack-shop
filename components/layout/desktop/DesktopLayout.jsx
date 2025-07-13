import Link from 'next/link';
import { useRouter } from 'next/router';

import SearchAndSort from '@/components/module/SearchAndSort';

import styles from './DesktopLayout.module.css';

function DesktopLayout() {
  const { asPath: path, pathname } = useRouter();

  return (
    <div className={styles.nav}>
      {pathname === '/' && (
        <div className={styles.inputContainer}>
          <SearchAndSort />
        </div>
      )}

      <div className={styles.linkContainer}>
        <Link href="/chat" className={`${styles.link} ${path == '/chat' && styles.selected}`}>
          پیام
        </Link>

        <Link href="/bookmark" className={`${styles.link} ${path == '/bookmark' && styles.selected}`}>
          ذخیره شده ها
        </Link>

        <Link href="/cart" className={`${styles.link} ${path == '/cart' && styles.selected}`}>
          سبد خرید
        </Link>

        <Link href="/" className={`${styles.link} ${pathname == '/' && styles.selected}`}>
          خانه
        </Link>
      </div>

      <Link href="/profile" className={`${styles.profile} ${styles.link} ${path == '/profile' && styles.selected}`}>
        پروفایل
      </Link>
    </div>
  );
}

export default DesktopLayout;
