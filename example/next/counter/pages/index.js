import { Model, useAcey} from 'acey'

class CounterModel extends Model {
  constructor(data, options){
    super(data, options)
  }

  get = () => this.state.counter
  increment = () => this.setState({counter: this.get() + 1}).save().cookie()
  decrement = () => this.setState({counter: this.get() - 1}).save().cookie()
}

const Counter = new CounterModel({counter: 0}, {connected: true, key: 'counter'})

export default function Home() {

  useAcey([
    Counter
  ])

  return (
    <div>
      <button onClick={Counter.decrement}>decrement</button>
      {Counter.get()}
      <button onClick={Counter.increment}>increment</button>
    </div>
  )
}

Home.getInitialProps = ({ query }) => {
  //Counter state updated on server side
  //Counter.setState({counter: 10}).save()
}
