import Layout from '@/components/layout/Layout';
import AlertProvider from '@/contexts/AlertProvider';
import TokenProvider from '@/contexts/TokenProvider';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <AlertProvider>
        <TokenProvider>
          <Component {...pageProps} />
        </TokenProvider>
      </AlertProvider>
    </Layout>
  );
}
