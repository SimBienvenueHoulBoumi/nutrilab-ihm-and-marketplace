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
          },
          {
            protocol: 'http',
            hostname: 'www.w3.org',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'via.placeholder.com',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'cdn.vox-cdn.com',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'www.amc.info',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'www.google.com',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'www.bedeo.fr',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'cdn.tasteatlas.com',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'www.classadventuretravel.com',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'www.paramount21.co.uk',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'images.squarespace-cdn.com',
            pathname: '/**',
          },
        ],
      },
};


export default nextConfig;
