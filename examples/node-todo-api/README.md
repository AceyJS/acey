## Todo API in Node with Acey 🌕
<img width="80%" src="https://github.com/Fantasim/assets/blob/master/68747470733a2f2f736961736b792e6e65742f5f415158346834542d51576854336c714d376763506d757a504b6d307479685a6b5f7a7645463950424c64596951.gif?raw=true" />

### Run

1. Node modules installation
```sh
yarn
```

<br />

2. Run the server
```sh
yarn start
```

Create a todo
```sh
curl --location --request POST 'http://localhost:4000/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "content": "Some non-latin text :p"
}'
```

Get the list of todos
```sh
curl http://localhost:4000
```

Delete a todo
```sh
curl --location --request DELETE 'http://localhost:4000/f028b1bb-5ba8-4fe8-a6db-84bfc60b6886'
```
