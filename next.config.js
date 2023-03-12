/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/** @type {import('next').NextConfig} */

require("dotenv").config();
const withAntdLess = require("next-plugin-antd-less");

module.exports = withAntdLess({
  lessVarsFilePath: "./src/styles/variables.less",
  experimental: {
    externalDir: true,
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  env: {
    BASE_API_URL: process.env.BASE_API_URL,
    PYTHON_BASE_API_URL: process.env.PYTHON_BASE_API_URL,
  },
  // Warning: This allows production builds to successfully complete even if
  // your project has TS & ESLint errors.
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
});
