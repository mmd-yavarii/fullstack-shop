import Layout from '@/components/layout/Layout';
import AlertProvider from '@/contexts/AlertProvider';
import BookmarkProvider from '@/contexts/BookmarkProvider';
import TokenProvider from '@/contexts/TokenProvider';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <TokenProvider>
      <AlertProvider>
        <BookmarkProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </BookmarkProvider>
      </AlertProvider>
    </TokenProvider>
  );
}
