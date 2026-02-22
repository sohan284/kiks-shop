/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.imgur.com", pathname: "/**" },
      { protocol: "https", hostname: "placeimg.com", pathname: "/**" },
      { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
      { protocol: "https", hostname: "placehold.co", pathname: "/**" },
      { protocol: "https", hostname: "via.placeholder.com", pathname: "/**" },
      { protocol: "https", hostname: "pravatar.cc", pathname: "/**" },
      { protocol: "https", hostname: "trial.co.id", pathname: "/**" },
      { protocol: "https", hostname: "api.lorem.space", pathname: "/**" },
      { protocol: "https", hostname: "image2.com", pathname: "/**" },
      { protocol: "https", hostname: "image3.com", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
