import type { NextPage } from 'next';
import { useState } from 'react';
import { postFetcher } from '../../util/fetcher';

const NewUserPage: NextPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await postFetcher(
      '/api/user',
      `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`,
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

  return (
    <div>
      <h1>新規ユーザ作成</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor='name'>
            名前：
            <input type='text' onChange={nameHandler} />
          </label>
        </div>
        <div>
          <label htmlFor='email'>
            メールアドレス：
            <input type='text' onChange={emailHandler} placeholder='xxxxxx@xxxx.co.jp' />
          </label>
        </div>
        <div>
          <input type='submit' value='登録' />
        </div>
      </form>
    </div>
  );
};

export default NewUserPage;
