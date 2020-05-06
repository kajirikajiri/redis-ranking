'use strict';

const express = require('express');
const cors = require('cors')
const Redis = require('ioredis')
const bodyParser = require('body-parser')
const redis = new Redis({
  host : 'us1-concrete-ghost-30336.lambda.store',
  port : '30336',
  password: '5b9d3b538b68402c87c129b7e933023a'
})

var corsOptions = {
  origin: 'http://localhost:4000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  console.log('/')
  res.send('connected');
});

app.get('/get', (req, res) => {
  console.log('/get')
  const {key} = req.query
  console.log(`key: ${key}`)

  redis.get(key, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
      console.log(`value: ${result}`)
      console.log('ok')
    }
  });
});

app.post('/set', (req, res) => {
  console.log('/set')
  const {key,value} = req.body
  console.log(`key: ${key}, value: ${value}`)
  redis.set(key, value)
  res.send('ok')
  console.log('ok')
});

app.post('/zadd', (req, res)=>{
  console.log('/zadd')
  redis.zadd("sortedSet", 1, "one", 2, "dos", 4, "quatro", 3, "three");
  redis.zrange("sortedSet", 0, -1, "WITHSCORES").then((res) => console.log(res)); // Promise resolves to ["one", "1", "dos", "2", "three", "3"] as if the command was ` redis> ZRANGE sortedSet 0 2 WITHSCORES `
})

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
