/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // allow images from next.config.js
  images: {
    domains: ['lh3.googleusercontent.com', "avatars.githubusercontent.com"],
  },
}

module.exports = nextConfig
