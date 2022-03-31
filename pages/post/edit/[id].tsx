import type { NextPage } from 'next';
import type { NextApiResponse } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';
import base64url from 'base64url';

const EditPostPage: NextPage = () => {
  return (
    <div>
      <h1 className='text-4xl m-4'>日記更新</h1>
    </div>
  );
};

export default EditPostPage