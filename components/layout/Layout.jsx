import { useRouter } from 'next/router';
import MobileLayout from './mobile/MobileLayout';

function Layout({ children }) {
  const { asPath: path } = useRouter();

  return (
    <>
      {children}
      {<MobileLayout />}
    </>
  );
}

export default Layout;
