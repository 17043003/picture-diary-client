import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header, { navElement } from '../components/header';

function MyApp({ Component, pageProps }: AppProps) {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const cookies = parseCookies();
    setLoggedIn(cookies['token'] != null);
  });

  useEffect(() => {
    if (!loggedIn) {
      router.push('/login');
    }
  }, [loggedIn]);

  const elements: navElement[] = [
    { name: 'TOP', path: '/' },
    { name: 'POST', path: '/post' },
    { name: 'MYPAGE', path: '/user/mypage' },
    loggedIn ? { name: 'LOGOUT', path: '' } : { name: 'LOGIN', path: '/login' },
  ];
  return (
    <>
      <Header elements={elements} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
