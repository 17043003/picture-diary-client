import type { NextPage } from 'next';
import Image from 'next/image';
import { getFetcher } from '../../util/fetcher';
import { useState, useEffect } from 'react';

type Post = {
  id: number;
  title: String;
  body: String;
  imageUrl: String;
};

const IndexPostPage: NextPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    getFetcher('/api/post').then((data) => setPosts(data));
  }, []);

  const postElements = posts?.map((post) => {
    return (
      <div key={post.id}>
        <div className='container'>
          <div className='image'></div>
          <Image src='/images/avatar.png' width={64} height={64} alt='Post thumbnail' />
          <div className='title'>{post.title}</div>
          <div className='body_summary'>{post.body}</div>
        </div>
      </div>
    );
  });

  return <div>{postElements}</div>;
};

export default IndexPostPage;
