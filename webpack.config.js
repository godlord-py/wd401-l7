import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Get the directory name using import.meta.url
const __dirname = dirname(fileURLToPath(import.meta.url));

// Define the entry and output
export const entry = './src/app.tsx';
export const output = {
  filename: 'bundle.js',
  path: resolve(__dirname, 'dist'),
};
