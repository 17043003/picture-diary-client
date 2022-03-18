// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        Authorization: `Bearer ${req.cookies.token}`,
      };
      const baseUrl: RequestInfo = process.env.BASEURL ?? 'http://localhost:8080';
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
  }
}
