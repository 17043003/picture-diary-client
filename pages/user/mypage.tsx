import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { User } from '../../util/user';
import axios from 'axios';

const MyPage: NextPage = ({ user }: { user: User }) => {
  return (
    <div>
      <h1 className='text-4xl font-bold mb-4 px-10 pt-4 pb-8 bg-gradient-to-r from-lime-200 to-lime-400'>マイページ</h1>
      <div className='underline mb-4'>
        <span className='text-4xl ml-6 mr-4'>Name:</span>
        <span className='text-4xl font-bold'>{user.name}</span>
      </div>
      <div className='underline mb-8'>
        <span className='text-4xl ml-6 mr-4'>Email:</span>
        <span className='text-4xl font-bold'>{user.email}</span>
      </div>

      <div className='mx-2 my-4'>
        <Link href='/post'>
          <a className='text-2xl font-bold text-red-700 bg-lime-200 rounded-lg p-2 hover:bg-lime-400'>日記一覧</a>
        </Link>
      </div>

      <div className='mx-2 mt-6'>
        <Link href='/post/new'>
          <a className='text-2xl font-bold text-violet-700 bg-lime-200 rounded-lg p-2 hover:bg-lime-400'>日記作成</a>
        </Link>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${context.req.cookies.token}`,
  };
  const baseUrl: RequestInfo = process.env.BASEURL ?? 'http://localhost:8080';

  const user = await axios
    .get(`${baseUrl}/api/user`, {
      headers,
    })
    .then((v) => v.data)
    .catch((e) => null);

  return user
    ? { props: { user } }
    : {
        redirect: {
          permanent: false,
          destination: '/login',
        },
      };
};

export default MyPage;
