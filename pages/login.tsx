import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { setCookie, parseCookies } from 'nookies';
import { useRouter } from 'next/router';

const Login: NextPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    const cookies = parseCookies();
    if (cookies['token']) {
      router.replace('/user/mypage');
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body: BodyInit = `email=${encodeURI(email)}&password=${encodeURI(password)}`;
    const headers = {
      Accept: 'application/x-www-form-urlencoded',
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    };
    const jwt = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers,
      body,
    }).then((v) => v.json());

    const expireMinutes = 60;
    setCookie(null, 'token', jwt?.token, {
      maxAge: expireMinutes * 60,
      path: '/',
    });

    if (jwt) {
      router.replace('/user/mypage');
    }
  };
  const changeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      <h1 className='font-bold text-4xl p-10 bg-gradient-to-r from-lime-200 to-lime-400'>
        ログイン
      </h1>
      <form onSubmit={handleSubmit} className='mt-10 mx-20'>
        <div className='flex rounded-md'>
          <label htmlFor='email' className='font-bold underline'>
            メールアドレス：
          </label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={changeEmail}
            className='focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 shadow-md px-2 py-1'
          />
        </div>
        <div className='flex rounded-md'>
          <label htmlFor='password' className='font-bold underline'>
            パスワード：
          </label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={changePassword}
            className='focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 shadow-md px-2 py-1'
          />
        </div>
        <input
          type='submit'
          className='bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 mt-4 rounded'
        />
      </form>
    </div>
  );
};

export default Login;
