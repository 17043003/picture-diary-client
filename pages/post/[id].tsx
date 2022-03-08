import type { NextPage } from 'next';
import { getFetcher, downloadImage } from '../../util/fetcher';
import { Post } from '../../util/post';
import blobToURI from '../../util/blobToURI';

const DetailPostPage: NextPage = ({ post, uri }: { post: Post; uri: string }) => {
  return (
    <div>
      {uri !== '' && <img src={uri} alt={post.imageUrls[0] ?? ''} width={120} height={120} />}
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const { id } = context.query;
  const post: Post = await getFetcher(`/api/post/${id}`);
  if (post.imageUrls[0] === null) return { props: { post, uri: '' } };

  const image = (await downloadImage(post.imageUrls[0])) ?? null;
  const uri = blobToURI(image);
  return { props: { post, uri } };
}

export default DetailPostPage;
