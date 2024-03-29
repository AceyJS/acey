import typescript from 'rollup-plugin-typescript2'
import external from 'rollup-plugin-peer-deps-external'
import url from '@rollup/plugin-url'
import { uglify } from 'rollup-plugin-uglify';

import pkg from './package.json'

const config = {
    input: './index.ts',
    external: ['lodash'],
    output: [
        {
            globals: {
                'lodash': 'lodash',
            },
            file: pkg.main,
            format: 'umd',
            name: 'acey'
        },
    ],
    plugins: [
        external(),
        url(),
        typescript({
            tsconfig: 'tsconfig.json',
            tsconfigOverride: { compilerOptions: { module: 'es2015' } },
            clean: true
        }),
    ]
}

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(uglify());
}

export default config