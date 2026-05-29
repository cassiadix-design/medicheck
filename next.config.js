/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => [
    {
      source: '/medicamentos/:slug*',
      destination: '/medicamento/:slug*',
      permanent: true,
    },
  ],
};

module.exports = nextConfig;
