module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["firebasestorage.googleapis.com", "github.com"],
  },
  // webpack5: true,
  // webpack: (config) => {
  //   config.resolve.fallback = {
  //     fs: false,
  //     crypto: false,
  //     http: false,
  //     https: false,
  //     net: false,
  //     path: false,
  //     stream: false,
  //     tls: false,
  //     dgram: false,
  //     os: false,
  //     child_process: false,
  //     zlib: false,
  //   };

  //   return config;
  // },
};
