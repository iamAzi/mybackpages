const path = require('path');
const fs = require('fs')
const Koa = require('koa');
const static = require('koa-static');
const Router = require('koa-router');
const address = require('address');
const bodyParser = require('koa-bodyparser');
const CardManager = require('./lib/poker-manager')

let home = new Router();

let users = new Map();

const cardManager = new CardManager();

home.get('/', async ctx => {
  ctx.response.type = 'html'
  ctx.body = fs.createReadStream('./static/index.html');
})


home.get('/pickCard', async ctx => {
  ctx.type = 'application/json';
  ctx.body = { data: cardManager.getTopCard() };
})

home.get('/getCardsRemain', async ctx => {
  ctx.type = 'application/json';
  ctx.body = { data: cardManager.getCardsRemain() };
})

home.post('/submitName', async ctx => {
  let data = ctx.request.body;

  ctx.type = 'application/json';

  const name = data.username;
  if (users.has(name)) {
    ctx.body = { code: 402 };
  } else {
    users.set(name, true);
    ctx.body = { code: 200 };
  }
})


const app = new Koa();

// 配置静态资源
const staticPath = 'dist'
app.use(static(
    path.join(__dirname, staticPath)
))

app.use(bodyParser())

app.use(home.routes(), home.allowedMethods());


app.listen(3000, () => {
  console.log(`listening ${address.ip()}:3000`)
})


