import type { NextPage } from 'next';
import { User } from '../../util/user';

const MyPage: NextPage = ({ user }: { user: User }) => {
  return (
    <div>
      <h1>{user.name}</h1>
      <h2>{user.email}</h2>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  return { props: { user: { name: 'test', email: 'test@gmail.com' } } };
}

export default MyPage;
