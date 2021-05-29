import { defineConfig } from 'vite';
import path from 'path';
import reactRefresh from '@vitejs/plugin-react-refresh';

const srcPath = path.resolve(__dirname, './src/') + '/';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: [
      {
        find: /^@\//,
        replacement: srcPath
      }
    ]
  }
});
