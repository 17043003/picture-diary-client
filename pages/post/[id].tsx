import type { NextPage, GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import { downloadImage } from '../../util/fetcher';
import { Post } from '../../util/post';
import blobToURI from '../../util/blobToURI';
import CheckAuth from '../../util/checkAuth';

type PostProp = {
  post: Post;
  uri: string;
  created: string;
  updated: string;
};

const DetailPostPage: NextPage = ({ post, uri, created, updated }: PostProp) => {
  return post ? (
    <div className='relative'>
      {uri !== '' && <Image src={uri} alt={post.imageUrls[0] ?? ''} width={120} height={120} />}
      <h1 className='text-6xl font-bold mx-4 mb-2'>{post.title}</h1>
      <p className='p-2 mx-4 mb-2 text-lg'>{post.body}</p>
      <p className='mx-2 mb-1 text-right'>作成日：{created}</p>
      <p className='mx-2 mb-1 text-right'>更新日：{updated}</p>
    </div>
  ) : (
    <div>記事の取得に失敗しました</div>
  );
};

const getServerSideProps = CheckAuth(async (ctx: GetServerSidePropsContext) => {
  const { id } = ctx.query;
  const url = ctx.req.url + `/api/post/${id}`;
  const headers = {
    authorization: ctx.req.headers.authorization,
    accept: ctx.req.headers.accept,
  } as HeadersInit;

  const post: Post = await fetch(url, {
    headers,
  })
    .then((v) => v.json())
    .catch(() => null);

  // format date
  const toStringDate = (date: Date): string => {
    const jpDate = new Date(date.valueOf() + 540 * 60 * 1000);
    return `${jpDate.getFullYear()}/${
      jpDate.getMonth() + 1
    }/${jpDate.getDate()} ${jpDate.getHours()}:${jpDate.getMinutes()}:${jpDate.getSeconds()}`;
  };

  if (post == null) return { props: { post: null } };

  const created = toStringDate(new Date(post.created));
  const updated = toStringDate(new Date(post.updated));

  if (post.imageUrls[0] == null) return { props: { post, uri: '', created, updated } };

  const image = (await downloadImage(post.imageUrls[0])) ?? null;
  if (image === null) return { props: { post, uri: '', created, updated } };
  const uri = blobToURI(image);

  return { props: { post, uri, created, updated } };
});

export default DetailPostPage;
export { getServerSideProps };
