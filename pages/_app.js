import Layout from '@/components/layout/Layout';
import AlertProvider from '@/contexts/AlertProvider';
import BookmarkProvider from '@/contexts/BookmarkProvider';
import CartProvider from '@/contexts/CartProvider';
import TokenProvider from '@/contexts/TokenProvider';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <TokenProvider>
      <AlertProvider>
        <BookmarkProvider>
          <CartProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </CartProvider>
        </BookmarkProvider>
      </AlertProvider>
    </TokenProvider>
  );
}
