import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import readComponentsProps from './src/utils/readComponentsProps.js';

const __dirname__ = path.dirname(fileURLToPath(import.meta.url));

// Mocks alias
const alias = {};

// Alias mocks for components props
const componentsProps = readComponentsProps(path.resolve, path.resolve(__dirname__, 'src'));

for (let componentName in componentsProps) {
	alias[`#build/ui.${componentName}.mjs`] = path.resolve(`test/mocks/ui.${componentName}.mjs`);
}

export default defineConfig({
    resolve: {
        alias
    },
    plugins: [vue()],
    test: {
        environment: 'happy-dom',
    },
});
