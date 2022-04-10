// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { S3 } from 'aws-sdk';

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
      const postID = /id=([\d]*)&/.exec(req.body)?.[1];
      const imageUri = /uri=(.*)$/.exec(req.body)?.[1];
      const data = await fetch(`${baseUrl}/api/post/${postID}`, {
        method: req.method,
        headers,
        body: req.body,
      }).catch(() => null);
      if (data === null) {
        res.status(500);
        return;
      }

      // delete image from S3
      if (imageUri != null) {
        deleteImage(req.headers['key-name'] as string, imageUri);
      }

      const response = await data.json();
      res.status(200).json(response);
      break;
    }
  }
}

const deleteImage = async (key: string, imageUri: string) => {
  const region = process.env.REGION ?? '';
  const bucket = new S3({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    region,
  });

  const bucketName = process.env.BUCKET_NAME ?? '';
  const Key = key ?? '';
  const param: S3.Types.DeleteObjectRequest = {
    Bucket: bucketName,
    Key: imageUri,
  };
  return bucket
    .deleteObject(param, (err) => {
      if (err) {
        return { error: `err:${err.message} file:${Key} - not deleted.` };
      } else {
        return { Key };
      }
    })
    .promise();
};
