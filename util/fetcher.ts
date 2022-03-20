import aws, { S3 } from 'aws-sdk';

const baseUrl: RequestInfo = process.env.BASEURL ?? 'http://localhost:8080';
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
};

export const getFetcher = async (url: RequestInfo) => {
  const res = await fetch(baseUrl + url, {
    method: 'GET',
  });
  return res.json();
};

export const postFetcher = async (url: RequestInfo, body: BodyInit) => {
  const res = await fetch(baseUrl + url, {
    method: 'POST',
    headers,
    body,
  });

  return res.json();
};

export const uploadImage = (file: File, fileKey: string): string | null => {
  aws.config.logger = console;

  const region = process.env.REGION ?? '';
  const bucket = new S3({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    region,
  });

  const bucketName = process.env.BUCKET_NAME ?? '';
  const param: S3.Types.PutObjectRequest = {
    Bucket: bucketName,
    Key: fileKey,
    Body: file,
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

export const downloadImage = async (fileKey: string) => {
  const region = process.env.REGION ?? '';
  const bucket = new S3({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    region,
  });

  const bucketName = process.env.BUCKET_NAME ?? '';
  const param = {
    Bucket: bucketName,
    Key: fileKey,
  };

  const result = await bucket
    .getObject(param, (err: Error, data: S3.GetObjectOutput) => {
      if (err) {
        console.error(err);
      } else {
        console.log('Successfully downloaded file.', data);
      }
    })
    .promise()
    .then(v => v.Body)
    .catch(() => null)
  if (result == null) return;
  return result;
};
