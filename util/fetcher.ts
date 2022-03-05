import aws, { S3 } from 'aws-sdk';

const baseUrl: RequestInfo = process.env.BASEURL ?? 'http://localhost:8080';
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
};

export const getFetcher = async (url: RequestInfo) => {
  const res = await fetch(baseUrl + url, {
    method: 'GET',
  }).then((r) => r.json());
  return res;
};

export const postFetcher = async (url: RequestInfo, body: BodyInit) => {
  const res = await fetch(baseUrl + url, {
    method: 'POST',
    headers,
    body,
  });

  return res.json();
};

export const uploadImage = (files: FileList): string | null => {
  aws.config.logger = console;

  const region = process.env.NEXT_PUBLIC_REGION ?? '';
  const bucket = new S3({
    accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET_KEY,
    region,
  });

  const bucketName = process.env.NEXT_PUBLIC_BUCKET_NAME ?? '';
  const fileKey = files[0].name;
  const param: S3.Types.PutObjectRequest = {
    Bucket: bucketName,
    Key: fileKey,
    Body: files[0],
    ContentType: 'image/jpeg',
  };

  bucket.upload(param, (err: Error, data: S3.ManagedUpload.SendData) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Successfully uploaded file.', data);
    }
  });
  return fileKey;
};
