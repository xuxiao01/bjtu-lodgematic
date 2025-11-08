// vite.config.mjs
import { defineConfig, loadEnv } from 'vite';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';

// ES Module 中需要这样定义 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * @returns {import('vite').PluginOption}
 */
const uniPlugin = () => ({
  name: 'uni-server-plugin',
  configureServer(server) {
    const app = server.middlewares;
    // add gzip
    app.use(compression());
  }
});

const buildConfig = {
  external: []
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    root: './src',
    plugins: [
      uniPlugin(),
    ],
    server: {
      open: '/index.html',
      port: 3000,
      proxy: {
        '/api': {
          target: 'http://localhost:8090/api',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    css: {
      devSourcemap: false
    },
    esbuild: {
      sourcemap: false
    },
    build: {
      sourcemap: false,
      outDir: path.resolve(__dirname, 'BJTUATV'),
      emptyOutDir: true,
      assetsDir: 'assets',
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
          output: {
          entryFileNames: `assets/[name].[hash].js`,
          chunkFileNames: `assets/[name].[hash].js`,
          assetFileNames: `assets/[name].[hash].[ext]`,
        },
        manualChunks: {
          main: ['./src/main'],
          zh: ['./src/zh']
        },
        ...(env.VITE_OPEN_CDN === 'true' ? { external: buildConfig.external } : {})
      },
    },
  };
});