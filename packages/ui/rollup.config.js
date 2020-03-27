import pkg from './package.json';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript2';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default {
  input: './src/index.ts',
  plugins: [
    typescript({ typescript: require('typescript') }),
    peerDepsExternal(),
    resolve({ extensions }),
    babel({ extensions, include: ['src/**/*'], runtimeHelpers: true }),
  ],
  output: [{ file: pkg.module, format: 'es' }],
};
