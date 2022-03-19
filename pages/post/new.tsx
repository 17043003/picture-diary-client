import type { NextPage } from 'next';
import { useState } from 'react';

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
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let requestBody: BodyInit = `title=${encodeURIComponent(title)}&body=${encodeURIComponent(
      body,
    )}`;

    // upload image
    let Key: string | null = null;
    if (images) {
      if (images.length !== 0) {
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'image/jpeg',
            'Key-Name': images[0].name,
        }
        
        const response = await fetch(process.env.NEXT_PUBLIC_FRONT_BASEURL + '/api/image', {
          method: 'POST',
          body: images[0],
          headers
        }).then(v => v.json())
        .catch(() => null);
        alert(response.Key);
        Key = response.Key;
      }
    }

    if (Key) {
      requestBody += `&imageUrl=${encodeURIComponent(Key)}`;
    }
    const data = await fetch(process.env.NEXT_PUBLIC_FRONT_BASEURL + '/api/post', {
      method: 'POST',
      body: requestBody,
    }).then((v) => v.json())
    .catch(() => null);
    if (data?.status === '200') alert('日記を保存しました');
    else alert('日記の保存に失敗しました');
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
