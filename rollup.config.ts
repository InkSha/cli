import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import esbuild from 'rollup-plugin-esbuild'
import typescript from '@rollup/plugin-typescript'
import babel from '@rollup/plugin-babel'
import copy from 'rollup-plugin-copy'
import terser from '@rollup/plugin-terser'
import { defineConfig } from 'rollup'
import fs from 'node:fs'
import pkg from './package.json' assert { type: 'json' }

const plugins = [
  resolve({ exportConditions: ['node'] }),
  commonjs(),
  json(),
  typescript(),
  esbuild(),
  babel({
    babelHelpers: 'bundled',
    extensions: ['.js', '.vue'],
  }),
  copy({
    targets: [
      {
        dest: ['dist'],
        src: ['src/assets/*', '!src/assets/*.ts'],
        rename: (name, ext) => {
          if (fs.statSync(`src/assets/${name}`).isDirectory()) {
            return `assets/${name}`
          }
          return `assets/${name}${ext}`
        },
      },
    ],
    expandDirectories: false,
  }),
  terser(),
]
const input = './src/index.ts'
export default defineConfig({
  input,
  output: [
    {
      dir: './dist',
      format: 'esm',
      entryFileNames: 'index.js',
      name: pkg.name,
    },
  ],
  plugins,
})
