import Layout from '@/components/layout/Layout';
import AlertProvider from '@/contexts/AlertProvider';
import BookmarkProvider from '@/contexts/BookmarkProvider';
import CartProvider from '@/contexts/CartProvider';

import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <AlertProvider>
      <BookmarkProvider>
        <CartProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CartProvider>
      </BookmarkProvider>
    </AlertProvider>
  );
}
