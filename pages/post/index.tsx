import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getFetcher } from '../../util/fetcher';
import { useState, useEffect } from 'react';
import { Post } from '../../util/post';

const IndexPostPage: NextPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    getFetcher('/api/post').then((data) => setPosts(data));
  }, []);

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
  }) ?? <div></div>;

  return <div>{postElements}</div>;
};

export default IndexPostPage;
