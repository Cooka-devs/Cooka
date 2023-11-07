/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "ichef.bbci.co.uk", "54.180.26.53"],
  },
};

module.exports = nextConfig;
