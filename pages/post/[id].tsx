import type { NextPage } from 'next';
import { getFetcher, downloadImage } from '../../util/fetcher';
import { Post } from '../../util/post';

const DetailPostPage: NextPage = ({ post, uri }: { post: Post; uri: string }) => {
  return (
    <div>
      <img src={uri} alt={post.imageUrls[0]} width={120} height={120} />
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const { id } = context.query;
  const post: Post = await getFetcher(`/api/post/${id}`);

  const image = (await downloadImage(post.imageUrls[0])) ?? null;
  if (image == null) return { props: { post, uri: '' } };

  const buffer = Buffer.from(image);
  const base64 = buffer.toString('base64');
  const mime = 'image/jpeg';
  const uri = `data:${mime};base64,` + base64;
  return { props: { post, uri } };
}

export default DetailPostPage;
