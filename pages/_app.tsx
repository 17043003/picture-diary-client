import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  const [loggedIn, setLoggedIn] = useState(false)
  const router = useRouter();
  useEffect(() => {
    const cookies = parseCookies();
    setLoggedIn(cookies['token'] != null)
  })

  useEffect(() => {
    const cookies = parseCookies();
    if (!cookies['token']) router.push('/login');
    return () => {};
  },[loggedIn]);
  return <Component {...pageProps} />;
}

export default MyApp;
