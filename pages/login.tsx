import type { NextPage } from 'next';
import { useState } from 'react';
import { setCookie } from 'nookies';

const Login: NextPage = () => {
  const [email, setEmail] = useState('');
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body: BodyInit = `email=${encodeURI(email)}`;
    const headers = {
      Accept: 'application/x-www-form-urlencoded',
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    };
    const jwt = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers,
      body,
    }).then((v) => v.json());

    setCookie(null, 'token', jwt?.token, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
  };
  const changeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='email'>メールアドレス：</label>
      <input type='email' name='email' onChange={changeEmail} />
      <input type='submit' />
    </form>
  );
};

export default Login;
