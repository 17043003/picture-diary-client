import type { NextPage } from 'next';
import useSWR from 'swr';
import { useState } from 'react';
import { postFetcher, uploadImage } from '../../util/fetcher';

const NewPostPage: NextPage = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [images, setImages] = useState<FileList>();

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleChangeBody = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const requestBody: BodyInit = `title=${encodeURIComponent(title)}&body=${encodeURIComponent(
      body,
    )}`;

    // upload image
    let imageLocation: string | null = null;
    if (!images) return;
    if (images.length !== 0) {
      imageLocation = uploadImage(images);
    }

    if (imageLocation !== null) {
      postFetcher('/api/post', requestBody + `&imageUrl=${encodeURIComponent(imageLocation)}`);
    } else {
      postFetcher('/api/post', requestBody);
    }
  };

  const handleFile = (event: React.FormEvent<HTMLInputElement>) => {
    const { files } = event.target as HTMLInputElement;
    if (files) {
      setImages(files);
    }
  };

  return (
    <div>
      <main>
        <h1>日記作成</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor='title'>
            <input type='text' name='title' id='input_title' onChange={handleChangeTitle} />
          </label>
          <label htmlFor='body'>
            <textarea
              name='body'
              id='input_body'
              onChange={handleChangeBody}
              cols={90}
              rows={10}
            ></textarea>
          </label>
          <label htmlFor='image'>
            <input type='file' onChange={handleFile} />
          </label>
          <input type='submit' value='save' />
        </form>
      </main>
    </div>
  );
};

export default NewPostPage;
