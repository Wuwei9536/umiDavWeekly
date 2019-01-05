const routes = require('./router.config');
// ref: https://umijs.org/config/
export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'umiDavWeekly',
      dll: false,
      hardSource: false,
      routes: {
        exclude: [
          /components/,
        ],
      },
    }],
  ],
  "proxy": {
    "/api": {
      "target": "http://weekly-dev.hsmob.com",
      "changeOrigin": true,
      // "pathRewrite": { "^/api": "" }
    }
  },
  routes
}
