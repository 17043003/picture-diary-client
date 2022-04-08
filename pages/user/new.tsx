import type { NextPage } from 'next';
import { useState } from 'react';
import { postFetcher } from '../../util/fetcher';

const NewUserPage: NextPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await postFetcher(
      '/api/user',
      `name=${encodeURIComponent(name)}&email=${encodeURIComponent(
        email,
      )}&password=${encodeURIComponent(password)}`,
    ).catch(() => ({ status: '500' }));

    if (res.status === '200') {
      alert(`ユーザ：${name}を登録しました`);
    } else {
      alert(`ユーザ：${name}の登録に失敗しました`);
    }
  };

  const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <h1 className='text-4xl font-bold m-4'>新規ユーザ作成</h1>
      <form onSubmit={submitHandler}>
        <div className='flex ml-6 mb-4'>
          <label htmlFor='name' className='flex-none w-32 text-right'>
            名前：
          </label>
          <input
            type='text'
            onChange={nameHandler}
            className='border-gray-300 shadow-md px-2 py-1 mb-4 flex-none w-64'
          />
        </div>
        <div className='flex ml-6 mb-4'>
          <label htmlFor='email' className='flex-none w-32 text-right'>
            メールアドレス：
          </label>
          <input
            type='text'
            onChange={emailHandler}
            placeholder='xxxxxx@xxxx.co.jp'
            className='border-gray-300 shadow-md px-2 py-1 mb-4 flex-none w-64'
          />
        </div>
        <div className='flex ml-6 mb-4'>
          <label htmlFor='password' className='flex-none w-32 text-right'>
            パスワード：
          </label>
          <input
            type='password'
            onChange={passwordHandler}
            className='border-gray-300 shadow-md px-2 py-1 mb-4 flex-none w-64'
          />
        </div>
        <div>
          <input
            type='submit'
            value='登録'
            className='text-2xl font-bold bg-red-200 rounded-lg px-2 py-1 mx-6 my-2 hover:bg-red-400 cursor-pointer'
          />
        </div>
      </form>
    </div>
  );
};

export default NewUserPage;
