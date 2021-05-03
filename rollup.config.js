import typescript from 'rollup-plugin-typescript2'
import external from 'rollup-plugin-peer-deps-external'
import url from '@rollup/plugin-url'
import { uglify } from 'rollup-plugin-uglify';

import pkg from './package.json'

const config = {
    input: './index.ts',
    external: ['lodash.isobjectlike', 'lodash.size', 'lodash.set', 'lodash.isplainobject', 'lodash.isfunction',  'lodash.groupby', 'lodash.uniqby', 'lodash.orderby', 'lodash.clonedeep', 'lodash.isempty', 'lodash.remove', 'lodash.findindex', 'lodash.filter'],
    output: [
        {
            globals: {
                'lodash.uniqby': 'uniqBy',
                'lodash/nth': 'nth',
                'lodash.orderby': 'orderBy',
                'lodash.clonedeep': 'cloneDeep',
                'lodash.isempty': 'isEmpty',
                'lodash.remove': 'remove',
                'lodash.findindex': 'findIndex',
                'lodash.set': 'set',
                'lodash.size': 'size',
                'lodash.filter': 'filter',
                'lodash.groupby': 'groupBy',
                'lodash.isfunction': 'isFunction',
                'lodash.isplainobject': 'isPlainObject',
                'lodash.isobjectlike': 'isObjectLike',
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