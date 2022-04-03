import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const cookies = parseCookies();
    if (!cookies['token']) router.push('/login');
    return () => {};
  });
  return <Component {...pageProps} />;
}

export default MyApp;
