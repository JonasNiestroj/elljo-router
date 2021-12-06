import elljo from 'vite-plugin-elljo'
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: './index.js',
  output: {
    file: 'dist/index.js',
    format: 'es',
    sourcemap: true
  },
  plugins: [
    elljo({}),
    resolve({
      browser: true,
      dedupe: ['elljo']
    }),
    commonjs()
  ]
}