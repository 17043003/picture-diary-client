import type { NextPage } from 'next';
import { useState } from 'react';
import { postFetcher } from '../util/fetcher';

const Login: NextPage = () => {
  const [email, setEmail] = useState('');
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const requestBody: BodyInit = `email=${encodeURI(email)}`;
    const jwt = await postFetcher('/login', requestBody).catch(() => null);
    alert(jwt?.token);
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
