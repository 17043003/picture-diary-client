import type { NextPage, GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Post } from '../../util/post';
import CheckAuth from '../../util/checkAuth';

const IndexPostPage: NextPage = ({ posts }: { posts: Post[] }) => {
  const postElements = posts?.map((post) => {
    return (
      <div key={post.id}>
        <Link href='/post/[id]' as={`/post/${post.id}`} passHref>
          <div className='max-w-sm rounded overflow-hidden shadow-lg m-4 bg-gray-200'>
            <a className='cursor-pointer'>
              <Image
                src='/noimage.png'
                width={64}
                height={64}
                alt='Post thumbnail'
                className='w-full'
              />
              <div className='font-bold text-xl ml-4 mb-2'>{post.title}</div>
              <div className='text-base ml-6 mb-2'>{post.body}</div>
            </a>
          </div>
        </Link>
      </div>
    );
  }) ?? <div>記事がありません</div>;

  return (
    <div>
      <div className='mx-2 mt-6'>
        <Link href='/post/new'>
          <a className='text-2xl font-bold text-violet-700 bg-lime-200 rounded-lg p-2 hover:bg-lime-400'>
            日記作成
          </a>
        </Link>
      </div>
      {postElements}
    </div>
  );
};

const getServerSideProps = CheckAuth(async (ctx: GetServerSidePropsContext) => {
  const url = ctx.req.url + '/api/post';
  const headers = {
    authorization: ctx.req.headers.authorization,
    accept: ctx.req.headers.accept,
  } as HeadersInit;

  const posts = await fetch(url, {
    headers,
  })
    .then((v) => v.json())
    .catch(() => null);

  return { props: { posts } };
});

export default IndexPostPage;
export { getServerSideProps };
