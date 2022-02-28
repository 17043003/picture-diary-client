import type { NextPage } from "next";
import useSWR from 'swr'
import { useState } from "react"
import { postFetcher } from "../../util/fetcher"

const NewPostPage: NextPage = () => {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }
    const handleChangeBody = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBody(e.target.value)
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const requestBody: BodyInit = `title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`
        const res = postFetcher('/api/post', requestBody);
        alert(res)
    }
  return (
    <div>
      <main>
        <h1>日記作成</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">
            <input type="text" name="title" id="input_title" onChange={handleChangeTitle} />
          </label>
          <label htmlFor="body">
            <textarea
              name="body"
              id="input_body"
              onChange={handleChangeBody}
              cols="90"
              rows="10"
            ></textarea>
          </label>
          <input type="submit" value="save" />
        </form>
      </main>
    </div>
  );
};

export default NewPostPage;
