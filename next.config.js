/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASEURL: process.env.BASEURL,
    ACCESS_KEY: process.env.ACCESS_KEY,
    SECRET_KEY: process.env.SECRET_KEY,
    REGION: process.env.REGION,
    BUCKET_NAME: process.env.BUCKET_NAME,
  },
};

module.exports = nextConfig;
