## Todo API in Node with Acey 🌕
<img width="80%" src="https://siasky.net/_AQX4h4T-QWhT3lqM7gcPmuzPKm0tyhZk_zvEF9PBLdYiQ" />

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