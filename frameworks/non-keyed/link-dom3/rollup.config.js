/*
 * @Author: chenzhongsheng
 * @Date: 2023-09-07 11:54:42
 * @Description: Coding something
 */
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

const plugins = [resolve(), commonjs()];

if (process.env.production) {
  plugins.push(terser());
}

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/main.js',
    format: 'iife',
    name: 'main'
  },
  plugins
};
