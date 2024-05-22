/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "d2lff49aaqvgse.cloudfront.net",
            },
        ],
    },
};

export default nextConfig;
