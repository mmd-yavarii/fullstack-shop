import MobileLayout from './mobile/MobileLayout';
import DesktopLayout from './desktop/DesktopLayout';

function Layout({ children }) {
  return (
    <>
      <DesktopLayout />
      {children}
      <MobileLayout />
    </>
  );
}

export default Layout;
