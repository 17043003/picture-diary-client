import type { NextPage } from 'next';
import { getFetcher } from '../../util/fetcher';
import { Post } from '../../util/post'

const DetailPostPage: NextPage = ({ post }: { post: Post }) => {
  return (
    <div>
      <p>{post.imageUrls}</p>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const { id } = context.query;
  const post: Post = await getFetcher(`/api/post/${id}`);
  return { props: { post } };
}

export default DetailPostPage;
