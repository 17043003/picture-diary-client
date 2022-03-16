import type { NextPage } from 'next';
import { GetServerSideProps } from 'next'
import { User } from '../../util/user';
import axios from "axios";

const MyPage: NextPage = ({ user }: { user: User }) => {
  return (
    <div>
      <h1>{user.name}</h1>
      <h2>{user.email}</h2>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${context.req.cookies.token}`,
  };
  const baseUrl: RequestInfo = process.env.BASEURL ?? 'http://localhost:8080';

  const user = await axios.get(`${baseUrl}/api/user`, {
    headers
  }).then(v => v.data)
  .catch(null)
  
  return { props: { user } };
}

export default MyPage;
