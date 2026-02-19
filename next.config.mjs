/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Required to fix "React is not defined" error with Sanity + Turbopack
  transpilePackages: ['sanity', 'next-sanity'],
}

export default nextConfig
