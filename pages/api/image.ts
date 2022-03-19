import type { NextApiRequest, NextApiResponse } from 'next';
import { S3 } from 'aws-sdk';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      const file = req.body;
      const region = process.env.REGION ?? '';
      const bucket = new S3({
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_KEY,
        region,
      });
      
      const bucketName = process.env.BUCKET_NAME ?? '';
      const Key = req.headers["key-name"] as string ?? "";
      const param: S3.Types.PutObjectRequest = {
        Bucket: bucketName,
        Key,
        Body: file,
        ContentType: 'image/jpeg',
      };

      bucket.upload(param, (err: Error, data: S3.ManagedUpload.SendData) => {
        if (err) {
          res.status(500).json({error: `err:${err.message} file:${Key} - upload error.`});
        } else {
            res.status(200).json({ Key })
        }
      });
  }
}
