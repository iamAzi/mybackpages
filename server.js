const path = require('path');
const fs = require('fs')
const Koa = require('koa');
const static = require('koa-static');
const Router = require('koa-router');
const address = require('address');

let home = new Router();

home.get('/', async ctx => {
  ctx.response.type = 'html'
  ctx.body = fs.createReadStream('./index.html');
})

home.get('/pickCard', async ctx => {
  let number = Math.ceil(Math.random() * 13);

  ctx.type = 'application/json';
  ctx.body = { data: number };
})

const app = new Koa();

// 配置静态资源
const staticPath = 'dist'
app.use(static(
    path.join(__dirname, staticPath)
))

app.use(home.routes(), home.allowedMethods());


app.listen(3000)

console.log(`listening ${address.ip()}:3000`)
