import type { NextPage } from 'next';
import Image from 'next/image'

const IndexPostPage: NextPage = ({ posts }: any) => {
  const post = (
    <div>
      <div className='container'>
        <div className='image'></div>
        <Image src="/images/avatar.png" width={64} height={64} alt="Post thumbnail" />
        <div className='title'>{posts.title}</div>
        <div className='body_summary'>{posts.body}</div>
      </div>
    </div>
  );

  return <div>{post}</div>;
};

export async function getServerSideProps() {
  return {
    props: {
      posts: {
        id: 1,
        title: 'test title',
        body: 'test body',
      },
    },
  };
}

export default IndexPostPage;
