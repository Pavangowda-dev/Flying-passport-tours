/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      // ✅ Allow images from your Supabase storage
      {
        protocol: "https",
        hostname: "your-supabase-project.supabase.co",
        port: "",
        pathname: "/**",
      },
      // ✅ Allow images from Cloudinary
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-dialog",
      "@radix-ui/react-toast",
      "@radix-ui/react-tabs",
      "@radix-ui/react-accordion",
    ],
  },
};

export default nextConfig;
