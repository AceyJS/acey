import { Model, Collection, config } from 'acey'
import express from 'express'
import { v4 as uuid } from 'uuid'
import morgan from 'morgan'
import LocalStorage from 'acey-node-store'

const PORT = 4000

class TodoModel extends Model {
    constructor(initialState: any = {}, options: any){
        super(initialState, options)
    }
}

class TodoCollection extends Collection {
    constructor(initialState: any, options: any){
        super(initialState, [TodoModel, TodoCollection], options)
    }

    create = (content: string): Model => {
        todos.push({
            id: uuid(),
            created_at: new Date(),
            content
        }).store()
        return todos.nodeAt(todos.count() - 1)
    }

    orderByLastCreation = () => this.orderBy(['created_at'], ['desc'])
}

const todos = new TodoCollection([], {connected: true, key: 'todolist'})

const initServer = async () => {

    config.setStoreEngine(new LocalStorage('./db'))
    await config.done()

    const server = express()
    server.use(express.json());
    server.use(morgan('tiny'))
    return server
}

initServer().then((server) => {
    console.log('Server started ')

    server.post('/', (req: express.Request, res: express.Response) => {
        const t = todos.create(req.body.content)
        res.json(t.to().plain())
    })
    server.delete('/:id', (req: express.Request, res: express.Response) => {
        todos.deleteBy({'id': req.params.id}).store()
        res.sendStatus(200)
    })
    server.get('/', (req: express.Request, res: express.Response) => {
        res.json(todos.orderByLastCreation().to().plain())
    })
    server.get('/:id', (req: express.Request, res: express.Response) => {
        const t = todos.find({id: req.params.id})
        t ? res.json(t.to().plain()) : res.sendStatus(404)
        
    })
    server.listen(PORT, () => {
        console.log(`> Ready on http://localhost:${PORT}`)
    })

})