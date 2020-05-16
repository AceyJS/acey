import { Model, manager } from 'acey'

export class CounterModel extends Model {

    constructor(data = {counter: 0}, options) {
        super(data, options)
    }

    get = () => this.state.counter
    increment = () => this.setState({counter: this.get() + 1}).save().localStore()
    decrement = () => this.setState({counter: this.get() - 1}).save().localStore()
}

export default new CounterModel(undefined, {connected: true, key: 'counter'})