/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.pexels.com',
                pathname: '/**', // 允许所有路径
            },
        ],
    },
};

export default nextConfig;