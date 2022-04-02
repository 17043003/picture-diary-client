import type { NextPage, GetServerSidePropsContext } from 'next';
import type { NextApiResponse } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';
import base64url from 'base64url';
import Form, { PostFormProps } from '../../../components/form';
import CheckAuth from '../../../util/checkAuth';

const EditPostPage: NextPage = ({ id, title, body }) => {
  const props: PostFormProps = {
    pageTitle: '日記更新',
    title,
    body,
    id,
    method: 'PUT',
  };
  return (
    <div>
      <Form {...props}></Form>
    </div>
  );
};

const getServerSideProps = CheckAuth(async (ctx: GetServerSidePropsContext) => {
  const { id } = ctx.query;
  const url = ctx.req.url + `/api/post/${id}`;
  const headers = {
    authorization: ctx.req.headers.authorization,
    accept: ctx.req.headers.accept,
  } as HeadersInit;

  const post = await fetch(url, {
    headers,
  })
    .then((v) => v.json())
    .catch(() => null);

  if (post == null) return { props: {} };

  return { props: { ...post } };
});

export default EditPostPage;
export { getServerSideProps };
