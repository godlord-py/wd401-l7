import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Get the directory name using import.meta.url
const __dirname = dirname(fileURLToPath(import.meta.url));

// Define the entry and output
const entry = '/home/godlord/capstone301/sportnewsapp/src/App.tsx';
const output = {
  filename: 'bundle.js',
  path: resolve(__dirname, 'dist'),
};

export default {
  entry,
  output,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      // Add other loaders if needed
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
