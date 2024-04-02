import { expect } from 'chai';
import 'mocha';
import { Model, config } from '../../index'
import { IOptions } from '../../src/model/option';
import Store from 'acey-node-store'
import fs from 'fs'
import _ from 'lodash'

interface IState {
    a: number
    b: string
    c: boolean
    d: Date
    e: BigInt
    
    f: number[],
    g: string[],
    h: boolean[],
    i: Date[],
    j: BigInt[]

}

const initialState: IState = {
    a: 0,
    b: '',
    c: false,
    d: new Date(),
    e: BigInt(0),

    f: [],
    g: [],
    h: [],
    i: [],
    j: []
}

class Mark extends Model {

    constructor(state: IState = initialState, options: IOptions){
        super(state, options)
    }

    get = () => {
        return {
            a: (): number => this.state.a,
            b: (): string => this.state.b,
            c: (): boolean => this.state.c,
            d: (): Date => this.state.d,
            e: (): BigInt => this.state.e
        }
    }
}

describe('Testing Store v2', () => {


    it('Setting local store to acey', () => {
        const DB_PATH = './.db'

        try {
            fs.rmdirSync(DB_PATH, {recursive: true})
        } catch(e){
            //
        } finally {
            fs.mkdirSync(DB_PATH, {recursive: true})
        }
        config.setStoreEngine(new Store(DB_PATH))
        const defaultJSONDataFile = `{"a":123,"b":"Hello","c":true,"d":"____AS-Date____1712027664013","e":{"$bigint":"123456789"},"f":[1,2,3],"g":["a","b","c"],"h":[true,false,true],"i":["____AS-Date____1712027664013","____AS-Date____1712027664013","____AS-Date____1712027664013"],"j":[{"$bigint":"1"},{"$bigint":"2"},{"$bigint":"3"}]}`
        fs.writeFileSync(`${DB_PATH}/mark0.json`, defaultJSONDataFile)
    })

    let m: Mark

    it('Recompose a model stored', async () => {
        m = new Mark(undefined, {connected: true, key: 'mark0'})
        await config.done()
        const d: IState = {
            a: 123,
            b: 'Hello',
            c: true,
            d: new Date(1712027664013),
            e: BigInt(123456789),

            f: [1,2,3],
            g: ['a', 'b', 'c'],
            h: [true, false, true],
            i: [new Date(1712027664013), new Date(1712027664013), new Date(1712027664013)],
            j: [BigInt(1), BigInt(2), BigInt(3)]
        }
        const data = m.to().plain()
        expect(_.isEqual(data, m.to().plain())).to.be.true

        expect(data.a).to.be.equal(d.a)
        expect(data.b).to.be.equal(d.b)
        expect(data.c).to.be.equal(d.c)
        expect(_.isEqual(data.d, d.d)).to.be.true        
        expect(data.e).to.be.equal(d.e)
        expect(_.isEqual(data.f, d.f)).to.be.true
        expect(_.isEqual(data.g, d.g)).to.be.true
        expect(_.isEqual(data.h, d.h)).to.be.true
        expect(_.isEqual(data.i, d.i)).to.be.true
        expect(_.isEqual(data.j, d.j)).to.be.true
    })



    it('Store and recompose', async () => {
        const d: IState = {
            a: 445,
            b: 'World',
            c: false,
            d: new Date(),
            e: BigInt(123456789),
        
            f: [4,5,6],
            g: ['d', 'e', 'f'],
            h: [false, true, false],
            i: [new Date(), new Date(), new Date()],
            j: [BigInt(1000), BigInt(2000), BigInt(3000)]
        }
        await m.setState(d).store()

        const data = await m.localStore().get()
        expect(_.isEqual(data, m.to().plain())).to.be.true

        expect(data.a).to.be.equal(d.a)
        expect(data.b).to.be.equal(d.b)
        expect(data.c).to.be.equal(d.c)
        expect(_.isEqual(data.d, d.d)).to.be.true        
        expect(data.e).to.be.equal(d.e)
        expect(_.isEqual(data.f, d.f)).to.be.true
        expect(_.isEqual(data.g, d.g)).to.be.true
        expect(_.isEqual(data.h, d.h)).to.be.true
        expect(_.isEqual(data.i, d.i)).to.be.true
        expect(_.isEqual(data.j, d.j)).to.be.true
    })
})
