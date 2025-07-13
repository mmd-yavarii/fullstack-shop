import MobileLayout from './mobile/MobileLayout';
import DesktopLayout from './desktop/DesktopLayout';
import { useRouter } from 'next/router';

function Layout({ children }) {
  const router = useRouter();

  return (
    <>
      {router.pathname != '/product/[id]' && <DesktopLayout />}
      {children}
      {router.pathname != '/product/[id]' && <MobileLayout />}
    </>
  );
}

export default Layout;
