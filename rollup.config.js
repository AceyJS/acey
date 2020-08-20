import typescript from 'rollup-plugin-typescript2'
import external from 'rollup-plugin-peer-deps-external'
import url from '@rollup/plugin-url'
import { uglify } from 'rollup-plugin-uglify';

import pkg from './package.json'

const config = {
    input: './index.ts',
    external: ['lodash/isArray', 'lodash/isObjectLike', 'lodash/isPlainObject', 'lodash/isFunction',  'lodash/groupBy', 'lodash/uniqBy', 'lodash/nth', 'lodash/orderBy', 'lodash/size', 'lodash/cloneDeep', 'lodash/isEmpty', 'lodash/set', 'lodash/find', 'lodash/chunk', 'lodash/remove', 'lodash/findIndex', 'lodash/filter'],
    output: [
        {
            globals: {
                'lodash/size': 'size',
                'lodash/uniqBy': 'uniqBy',
                'lodash/nth': 'nth',
                'lodash/orderBy': 'orderBy',
                'lodash/cloneDeep': 'cloneDeep',
                'lodash/isEmpty': 'isEmpty',
                'lodash/set': 'set',
                'lodash/find': 'find',
                'lodash/chunk': 'chunk',
                'lodash/remove': 'remove',
                'lodash/findIndex': 'findIndex',
                'lodash/filter': 'filter',
                'lodash/groupBy': 'groupBy',
                'lodash/isFunction': 'isFunction',
                'lodash/isPlainObject': 'isPlainObject',
                'lodash/isObjectLike': 'isObjectLike',
                'lodash/isArray': 'isArray',
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
            clean: true
        }),
    ]
}

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(uglify());
}

export default config