import Layout from '@/components/layout/Layout';
import AlertProvider from '@/contexts/AlertProvider';
import TokenProvider from '@/contexts/TokenProvider';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <TokenProvider>
      <AlertProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AlertProvider>
    </TokenProvider>
  );
}
