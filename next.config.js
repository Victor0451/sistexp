module.exports = {
  reactStrictMode: true,

  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },

  env: {
    'MYSQL_HOST': '190.231.67.172',
    'MYSQL_PORT': '5506',
    'MYSQL_DATABASE': "sistexp",
    'MYSQL_USER': "vlongo",
    'MYSQL_PASSWORD': "nokia5800",
  },

  // fallback: {
  //   "fs": false,
  // }
}
