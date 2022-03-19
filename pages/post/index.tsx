import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Post } from '../../util/post';
import CheckAuth from '../../util/checkAuth';
import { GetServerSidePropsContext } from 'next';

const IndexPostPage: NextPage = ({posts}: {posts: Post[]}) => {
  const postElements = posts?.map((post) => {
    return (
      <div key={post.id}>
        <Link href='/post/[id]' as={`/post/${post.id}`} passHref>
          <a>
            <div className='container'>
              <div className='image'></div>
              <Image src='/images/avatar.png' width={64} height={64} alt='Post thumbnail' />
              <div className='title'>{post.title}</div>
              <div className='body_summary'>{post.body}</div>
            </div>
          </a>
        </Link>
      </div>
    );
    }) ?? <div>記事がありません</div>;

  return <div>{postElements}</div>;
};

const getServerSideProps = CheckAuth(async (ctx: GetServerSidePropsContext) => {
    const url = ctx.req.url + "/api/post";
    const headers = {
        authorization: ctx.req.headers.authorization,
        accept: ctx.req.headers.accept,
    } as HeadersInit;
    const posts = await fetch(url, {
        headers
    }).then(v => v.json())
    
    return { props: { posts }}
})

export default IndexPostPage;
export {getServerSideProps};
