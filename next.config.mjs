/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: false,
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'www.themealdb.com',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'via.placeholder.com',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'media.istockphoto.com',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'atlasocio.com',
            pathname: '/**',
          }
        ],
      },
};


export default nextConfig;
