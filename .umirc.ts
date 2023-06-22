import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
  fastRefresh: {},
  dva: {},
  antd: {},
  proxy: {
    '/api/': {
      target: 'https://pvp.qq.com/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
});
