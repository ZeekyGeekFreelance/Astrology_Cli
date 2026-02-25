/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // Required to fix "React is not defined" error with Sanity + Turbopack
  transpilePackages: ['sanity', 'next-sanity'],
}

export default nextConfig
