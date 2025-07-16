import Link from 'next/link';
import { useRouter } from 'next/router';

import { PiHouse, PiHouseDuotone } from 'react-icons/pi';
import { PiUserCircleLight, PiUserCircleDuotone } from 'react-icons/pi';
import { PiHeart, PiHeartDuotone } from 'react-icons/pi';
import { PiShoppingCartLight, PiShoppingCartDuotone } from 'react-icons/pi';
import { PiChatDotsLight, PiChatDotsDuotone } from 'react-icons/pi';

import styles from './MobileLayout.module.css';

function MobileLayout({ children }) {
  const { asPath: path, pathname } = useRouter();

  return (
    <>
      {children}

      {path !== '/auth/login' && path !== '/auth/signup' && (
        <footer className={styles.footer}>
          <div className={`${styles.links} ${path.includes('/profile') && styles.selected}`}>
            <Link href={'/profile'}>
              {path.includes('/profile') ? <PiUserCircleDuotone fontSize="1.6rem" /> : <PiUserCircleLight fontSize="1.6rem" />}
            </Link>
            <p>پروفایل</p>
          </div>

          {/* <div className={`${styles.links} ${path.includes('/chat') && styles.selected}`}>
            <Link href={'/chat'}>{path.includes('/chat') ? <PiChatDotsDuotone fontSize="1.6rem" /> : <PiChatDotsLight fontSize="1.6rem" />}</Link>
            <p>پیام</p>
          </div> */}

          <div className={`${styles.links} ${path.includes('/cart') && styles.selected}`}>
            <Link href={'/cart'}>
              {path.includes('/cart') ? <PiShoppingCartDuotone fontSize="1.6rem" /> : <PiShoppingCartLight fontSize="1.6rem" />}
            </Link>
            <p>سبد خرید</p>
          </div>

          <div className={`${styles.links} ${path.includes('/bookmark') && styles.selected}`}>
            <Link href={'/bookmark'}>{path.includes('/bookmark') ? <PiHeartDuotone fontSize="1.6rem" /> : <PiHeart fontSize="1.6rem" />}</Link>
            <p>ذخیره شده</p>
          </div>

          <div className={`${styles.links} ${pathname === '/' && styles.selected}`}>
            <Link href="/">{pathname === '/' ? <PiHouseDuotone fontSize="1.6rem" /> : <PiHouse fontSize="1.6rem" />}</Link>
            <p>خانه</p>
          </div>
        </footer>
      )}
    </>
  );
}

export default MobileLayout;
