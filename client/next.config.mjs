/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        // You can specify a pathname for more fine-grained control, or leave it as "*" for all paths.
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
