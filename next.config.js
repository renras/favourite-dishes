/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  nextConfig,
  images: {
    domains: [
      "images.pexels.com",
      "www.willflyforfood.net",
      "firebasestorage.googleapis.com",
    ],
  },
};
