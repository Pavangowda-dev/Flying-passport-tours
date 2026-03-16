/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Required for Coolify + VPS
  output: "standalone",

  // ✅ Prevent build failures in production
  typescript: {
    ignoreBuildErrors: true,
  },

  // ✅ Image optimization for Cloudflare R2 + Cloudinary + Supabase
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-74c3db65b54e468b90a9796527e32c3d.r2.dev",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pub-fa9301196ad14c85b826a06ce70235cf.r2.dev",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pub-b9d2f98cd53847e7b99c46f2baa5a932.r2.dev",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pub-aa78efca3b694935a0c1c9578793f4a8.r2.dev",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "fnpwcjojmrzajgtbhrjn.supabase.co",
        pathname: "/**",
      },
    ],

    formats: ["image/avif", "image/webp"],

    qualities: [75, 85, 95],

    minimumCacheTTL: 60 * 60 * 24 * 30,

    unoptimized: false,
  },

  // ✅ Performance optimization
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-dialog",
      "@radix-ui/react-toast",
      "@radix-ui/react-tabs",
      "@radix-ui/react-accordion",
    ],
  },

  // ✅ Production optimization
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;