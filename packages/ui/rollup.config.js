import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default {
  input: './src/index.ts',
  plugins: [
    typescript({ typescript: require('typescript') }),
    peerDepsExternal(),
    resolve({ extensions }),
    babel({ extensions, include: ['src/**/*'], runtimeHelpers: true }),
    terser(),
    commonjs(),
  ],
  output: [{ file: pkg.module, format: 'es' }],
};
