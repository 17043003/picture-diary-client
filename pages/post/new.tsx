import type { NextPage, GetServerSidePropsContext } from 'next';
import Form, { PostFormProps } from '../../components/form';

const NewPostPage: NextPage = () => {
  const props: PostFormProps = {
    pageTitle: '日記作成',
    id: 0,
    title: '',
    body: '',
    method: 'POST',
  };
  return (
    <div>
      <Form {...props}></Form>
    </div>
  );
};

export default NewPostPage;
