import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import base64url from 'base64url';

export type PostFormProps = {
  pageTitle: string;
  title: string;
  body: string;
  id: number;
  method: 'POST' | 'PUT';
};

const Form: React.FC<PostFormProps> = (props) => {
  const [title, setTitle] = useState(props.title ?? '');
  const [body, setBody] = useState(props.body ?? '');
  const [images, setImages] = useState<FileList>();
  const [base64, setBase64] = useState('');

  const router = useRouter();

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleChangeBody = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  const handleFile = async (event: React.FormEvent<HTMLInputElement>) => {
    const { files } = event.target as HTMLInputElement;
    if (files) {
      setImages(files);
      const encoded = base64url.encode(Buffer.from(await files[0].arrayBuffer()), 'utf8');
      setBase64(encoded.replaceAll('_', '/').replaceAll('-', '+'));
    }
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let requestBody: BodyInit = `title=${encodeURIComponent(title)}&body=${encodeURIComponent(
      body,
    )}&id=${props.id}`;

    // upload image
    const now = new Date();
    const keyTime = `${now.getFullYear()}${
      now.getMonth() + 1
    }${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;
    let Key: string | null = null;
    if (images) {
      if (images.length !== 0) {
        const headers = {
          Accept: 'application/json',
          'Content-Type': images[0].type,
          'Key-Name': `${keyTime}/${images[0].name}`,
        };

        const response = await fetch(process.env.NEXT_PUBLIC_FRONT_BASEURL + '/api/image', {
          method: 'POST',
          body: base64,
          headers,
        });
        if (response.status !== 200) {
          alert('画像の保存に失敗しました');
          alert((await response?.json()).error);
          return;
        }
        Key = (await response?.json())?.Key;
        alert(Key);
      }
    }

    if (Key) {
      requestBody += `&imageUrl=${encodeURIComponent(Key)}`;
    }
    alert(requestBody);
    const data = await fetch(process.env.NEXT_PUBLIC_FRONT_BASEURL + '/api/post', {
      method: props.method,
      body: requestBody,
    })
      .then((v) => v.json())
      .catch(() => null);
    if (data?.status === '200') {
      alert('日記を保存しました');
      // redirect
      router.push(`/post/${data.id}`);
    } else alert('日記の保存に失敗しました');
  };
  return (
    <div>
      <h1 className='text-4xl m-4'>{props.pageTitle}</h1>
      <form onSubmit={handleSubmit}>
        <img src={`data:image/jpeg;base64,${base64}`} alt='' />
        <div className='mx-2'>
          <label htmlFor='title' className='block text-lg'>
            タイトル
          </label>
          <input
            type='text'
            name='title'
            id='input_title'
            value={title}
            onChange={handleChangeTitle}
            className='border-gray-300 shadow-md px-2 py-1 mb-4'
          />
        </div>
        <div className='mx-2'>
          <label htmlFor='body' className='block text-lg'>
            本文
          </label>
          <textarea
            name='body'
            id='input_body'
            value={body}
            onChange={handleChangeBody}
            cols={90}
            rows={10}
            className='border-gray-300 shadow-md px-2 py-1 mb-4'
          ></textarea>
        </div>
        <div className='mx-2'>
          <label htmlFor='image'>
            <input type='file' onChange={handleFile} />
          </label>
        </div>
        <input
          type='submit'
          value='save'
          className='text-2xl font-bold bg-lime-200 rounded-lg px-2 py-1 mx-1 my-2 hover:bg-lime-400 cursor-pointer'
        />
      </form>
    </div>
  );
};

export default Form;
