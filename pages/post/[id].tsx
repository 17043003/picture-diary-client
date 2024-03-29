import type { NextPage, GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { downloadImage } from '../../util/fetcher';
import { Post } from '../../util/post';
import blobToURI from '../../util/blobToURI';
import CheckAuth from '../../util/checkAuth';
import Button from '../../components/button';
import { useRouter } from 'next/router';

type PostProp = {
  id: number;
  post: Post;
  uri: string;
  created: string;
  updated: string;
};

const DetailPostPage: NextPage<PostProp> = ({ post, uri, created, updated }) => {
  const router = useRouter();
  const deleteHandler = async () => {
    const data = await fetch(process.env.NEXT_PUBLIC_FRONT_BASEURL + '/api/post', {
      method: 'DELETE',
      body: `id=${post.id}&uri=${post.imageUrls[0]}`,
    })
      .then((v) => v.json())
      .catch(() => null);
    if (data?.status === '200') {
      alert('日記を削除しました');
      // redirect
      router.push(`/post`);
    } else {
      alert('日記の削除に失敗しました');
    }
  };

  return post ? (
    <div className='relative'>
      {uri !== '' && <Image src={uri} alt={post.imageUrls[0] ?? ''} width={120} height={120} />}
      <h1 className='text-6xl font-bold mx-4 mb-2'>{post.title}</h1>
      <p className='p-2 mx-4 mb-2 text-lg break-words whitespace-pre-wrap'>{post.body}</p>
      <Link href={`/post/edit/${post.id}`}>
        <a className='text-2xl font-bold text-violet-700 bg-lime-200 rounded-lg p-2 hover:bg-lime-400'>
          編集
        </a>
      </Link>
      <Button
        buttonName={'削除'}
        bgColor={'red'}
        textColor={'violet'}
        clickHandler={deleteHandler}
      />
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
  const uri = blobToURI(image as Blob);

  return { props: { post, uri, created, updated } };
});

export default DetailPostPage;
export { getServerSideProps };
