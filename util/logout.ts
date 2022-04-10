import { parseCookies, destroyCookie } from 'nookies';
import { NextRouter } from 'next/router';

const logout = (router: NextRouter) => {
  const cookies = parseCookies();
  return async () => {
    if (!!cookies['token'] && confirm('ログアウトしますか？')) {
      destroyCookie({}, 'token', {
        path: '/',
      });
      router.push('/login');
    }
  };
};

export default logout;
