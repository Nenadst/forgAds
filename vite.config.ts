import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
    server: {
        watch: {
            usePolling: true
        },
        host: '0.0.0.0', // needed for the Docker Container port mapping to work
        strictPort: true,
        open: true,
        port: 4000,
    },
    build: {
        outDir: 'build',
    },
    resolve: {
        alias: [{ find: '@asp', replacement: path.resolve(__dirname, 'src') }],
    },
});