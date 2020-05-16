import { Model } from 'acey'

class Counter extends Model {
    constructor(o = {counter: 0}, options: any){
        super(o, options)
    }

    get = () => this.state.counter
    increment = () => this.setState({counter: this.get() + 1}).save()
    decrement = () => this.setState({counter: this.get() - 1}).save()
}

export default Counter