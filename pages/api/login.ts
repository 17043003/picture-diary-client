// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  token: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
  };
  const baseUrl: RequestInfo = process.env.BASEURL ?? 'http://localhost:8080';
  const data = await fetch(`${baseUrl}/login`, {
    method: 'POST',
    headers,
    body: `email=${req.body.email}&password=${req.body.password}`,
  });
  const { token } = await data.json();
  res.status(200).json({ token });
}
