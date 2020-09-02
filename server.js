const Koa = require('koa');
const fs = require('fs')

const app = new Koa();

app.use(async ctx => {
  ctx.response.type = 'html'
  ctx.body = fs.createReadStream('./index.html');
});

app.listen(3000);
