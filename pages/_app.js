import AlertProvider from '@/contexts/AlertProvider';
import TokenProvider from '@/contexts/TokenProvider';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <AlertProvider>
      <TokenProvider>
        <Component {...pageProps} />
      </TokenProvider>
    </AlertProvider>
  );
}
