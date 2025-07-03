import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [],
    build: {
        rollupOptions: {
            input: {
                main: './src/scripts/app.js',
            },
        },
    },
});