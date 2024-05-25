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
    // fallback: [
    //     // These rewrites are checked after both pages/public files
    //     // and dynamic routes are checked
    //     {
    //         source: "/api/:path*",
    //         destination: `https://buidlback.rohitnandi.xyz/v1/workers/:path*`,
    //     },
    // ],
};

export default nextConfig;
