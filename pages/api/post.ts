// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    Authorization: `Bearer ${req.cookies.token}`,
  };
  const baseUrl: RequestInfo = process.env.BASEURL ?? 'http://localhost:8080';
  switch (req.method) {
    case 'POST': {
      const data = await fetch(`${baseUrl}/api/post`, {
        method: 'POST',
        headers,
        body: req.body,
      }).catch(() => null);
      if (data === null) {
        res.status(500);
        return;
      }
      const response = await data.json();
      res.status(200).json(response);
      break;
    }

    case 'PUT': {
      const result = /id=([\d])/.exec(req.body);
      const postID = result?.[1];
      const data = await fetch(`${baseUrl}/api/post/${postID}`, {
        method: req.method,
        headers,
        body: req.body,
      }).catch(() => null);
      if (data === null) {
        res.status(500);
        return;
      }
      const response = await data.json();
      res.status(200).json(response);
      break;
    }

    case 'DELETE': {
      const result = /id=([\d])/.exec(req.body);
      const postID = result?.[1];
      const data = await fetch(`${baseUrl}/api/post/${postID}`, {
        method: req.method,
        headers,
        body: req.body,
      }).catch(() => null);
      if (data === null) {
        res.status(500);
        return;
      }
      const response = await data.json();
      res.status(200).json(response);
      break;
    }
  }
}
