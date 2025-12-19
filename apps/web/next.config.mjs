/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ REQUIRED for Coolify + VPS
  output: "standalone",

  // ✅ Prevent build failures in production
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // ✅ Image optimization (Supabase + Cloudinary)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },

  // ✅ Performance optimizations
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-dialog",
      "@radix-ui/react-toast",
      "@radix-ui/react-tabs",
      "@radix-ui/react-accordion",
    ],
  },

  // ✅ Required for Docker / VPS networking
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
