/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/apps",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.okta.com",
        port: "",
        pathname: "/sites/default/files/Okta_Logo_White_Medium.png",
      },
    ],
  },
};

module.exports = nextConfig;
