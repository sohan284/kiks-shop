/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.imgur.com" },
      { protocol: "https", hostname: "placeimg.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "via.placeholder.com" },
      { protocol: "https", hostname: "pravatar.cc" },
      { protocol: "https", hostname: "trial.co.id" },
      { protocol: "https", hostname: "api.lorem.space" },
    ],
  },
};

export default nextConfig;
