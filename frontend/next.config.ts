import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // SEO用リダイレクト
  async redirects() {
    return [
      {
        source: "/ai-background-remover",
        destination: "/editor",
        permanent: true,
      },
      {
        source: "/remove-background-online",
        destination: "/editor",
        permanent: true,
      },
      {
        source: "/png-background-remover",
        destination: "/editor",
        permanent: true,
      },
      {
        source: "/free-background-remover",
        destination: "/editor",
        permanent: true,
      },
    ];
  },

  // バックエンドAPIへのプロキシ
  async rewrites() {
    const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";
    return [
      {
        source: "/api/remove-bg",
        destination: `${backendUrl}/api/remove-bg`,
      },
      {
        source: "/api/health",
        destination: `${backendUrl}/api/health`,
      },
      {
        source: "/api/contact",
        destination: `${backendUrl}/api/contact`,
      },
    ];
  },
};

export default nextConfig;
