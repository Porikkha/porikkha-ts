/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: true,
      appDir: true,
      serverComponentsExternalPackages: ["mongoose"],
    },
    images: {
      domains: ['lh3.googleusercontent.com'],
    },
    webpack(config) {
      config.experiments = {
        ...config.experiments,
        topLevelAwait: true,
      };
      Object.assign(config.resolve.alias, {
        '@mongodb-js/zstd': false,
        '@aws-sdk/credential-providers': false,
        'snappy': false,
        'aws4': false,
        'mongodb-client-encryption': false,
        'kerberos': false,
        'supports-color': false
      });
      return config
    }
  }

module.exports = nextConfig