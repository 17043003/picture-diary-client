import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Header, { navElement } from '../components/header';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const exceptPath = (path: string): boolean => {
    const paths = ['/', '/login', '/user/new'];
    return paths.includes(path);
  };

  useEffect(() => {
    const cookies = parseCookies();

    if (!exceptPath(router.pathname) && cookies['token'] == null) {
      router.push('/login');
    }
  });

  const elements: navElement[] = [
    { name: 'TOP', path: '/' },
    { name: 'POST', path: '/post' },
    { name: 'MYPAGE', path: '/user/mypage' },
  ];

  return (
    <>
      <div className='flex flex-col'>
        <div className='top-0 sticky overflow-visible z-10'>
          <Header elements={elements} />
        </div>
        <div className='grow'>
          <Component {...pageProps} />
        </div>
      </div>
    </>
  );
}

export default MyApp;
