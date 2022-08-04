/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "www.iconpacks.net",
      "lh3.googleusercontent.com",
      "carlosfvenegas.com",
      "pbs.twimg.com",
      "www.seekpng.com",
    ],
  },
};
