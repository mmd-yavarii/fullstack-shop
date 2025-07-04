import Link from 'next/link';
import { useRouter } from 'next/router';

import { PiHouse, PiHouseDuotone } from 'react-icons/pi';
import { PiUserCircleLight, PiUserCircleDuotone } from 'react-icons/pi';
import { PiHeart, PiHeartDuotone } from 'react-icons/pi';
import { PiShoppingCartLight, PiShoppingCartDuotone } from 'react-icons/pi';
import { PiChatDotsLight, PiChatDotsDuotone } from 'react-icons/pi';

import styles from './MobileLayout.module.css';
import { useToken } from '@/contexts/TokenProvider';

function MobileLayout({ children }) {
  const { asPath: path } = useRouter();
  const token = useToken();

  return (
    <>
      {children}

      {path != '/auth/login' && path != '/auth/signup' && (
        <footer className={styles.footer}>
          <div className={`${styles.links} ${path == '/profile' && styles.selected}`}>
            <Link href={!token ? '/auth/login' : '/profile'}>
              {path == '/profile' ? <PiUserCircleDuotone fontSize="1.6rem" /> : <PiUserCircleLight fontSize="1.6rem" />}
            </Link>
            <p>پروفایل</p>
          </div>

          <div className={`${styles.links} ${path == '/chat' && styles.selected}`}>
            <Link href={!token ? '/auth/login' : '/chat'}>
              {path == '/chat' ? <PiChatDotsDuotone fontSize="1.6rem" /> : <PiChatDotsLight fontSize="1.6rem" />}
            </Link>
            <p>پیام</p>
          </div>

          <div className={`${styles.links} ${path == '/cart' && styles.selected}`}>
            <Link href={!token ? '/auth/login' : '/cart'}>
              {path == '/cart' ? <PiShoppingCartDuotone fontSize="1.6rem" /> : <PiShoppingCartLight fontSize="1.6rem" />}
            </Link>
            <p>سبد خرید</p>
          </div>

          <div className={`${styles.links} ${path == '/bookmark' && styles.selected}`}>
            <Link href={!token ? '/auth/login' : '/bookmark'}>
              {path == '/bookmark' ? <PiHeartDuotone fontSize="1.6rem" /> : <PiHeart fontSize="1.6rem" />}
            </Link>
            <p>ذخیره شده</p>
          </div>

          <div className={`${styles.links} ${path == '/' && styles.selected}`}>
            <Link href="/">{path == '/' ? <PiHouseDuotone fontSize="1.6rem" /> : <PiHouse fontSize="1.6rem" />}</Link>
            <p>خانه</p>
          </div>
        </footer>
      )}
    </>
  );
}

export default MobileLayout;
