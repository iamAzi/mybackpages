const path = require('path');
const fs = require('fs')
const Koa = require('koa');
const static = require('koa-static');
const Router = require('koa-router');
const address = require('address');
const bodyParser = require('koa-bodyparser');
const CardManager = require('./lib/poker-manager')
const Player = require('./lib/player');

let home = new Router();

let userNames = new Map();

let users = [];

function getUserByName(name) {
  let user = users.find(item => {
    return item.name == name
  })
  return user;
}

function cleanCheap() {
  users.forEach(item => {
    item.cheapGirl = false;
  })
}

function cleanStupid() {
  users.forEach(item => {
    item.stupid = false;
  })
}

const cardManager = new CardManager();


home.get('/', async ctx => {
  ctx.response.type = 'html'
  ctx.body = fs.createReadStream('./static/index.html');
})

home.get('/init', async ctx => {
  ctx.type = 'application/json';
  let name = getNameByCookie(ctx);
  // 必须用户的cookie和当前游戏玩家对得上，才认为玩家是正在游戏中
  if (userNames.has(name) && name) {
    ctx.body = { name: name };
  } else {
    ctx.cookies.set('name', '');
    ctx.body = { name: '' };
  }
})

home.get('/userStatus', async ctx => {
  ctx.type = 'application/json';
  let name = getNameByCookie(ctx);
  let user = getUserByName(name);
  ctx.body = {
    ...user
  }
})

home.get('/pickCard', async ctx => {
  ctx.type = 'application/json';

  const name = getNameByCookie(ctx);
  const user = getUserByName(name);

  const card = cardManager.getTopCard();
  
  switch (card) {
    case 'A':
      user.addOneCup();
      break;
    case '2':
      cleanCheap();
      user.beCheapGirl();
      break;
    case '5':
      user.addCamera();
      break;
    case '6':
      user.addNose();
      break;
    case '10':
      cleanStupid();
      user.beStupid();
      break;
    case '8':
      user.addWC();
      break;
    case 'Joker':
    case 'Big Joker':
      cleanCheap();
      cleanStupid();
      break;

    default:
      break;
  }

  ctx.body = { data: card };
})

home.get('/getCardsRemain', async ctx => {
  ctx.type = 'application/json';
  ctx.body = { data: cardManager.getCardsRemain() };
})

home.post('/submitName', async ctx => {
  let data = ctx.request.body;

  ctx.type = 'application/json';

  const name = data.name;
  if (userNames.has(name)) {
    ctx.body = { code: 402 };
  } else {
    userNames.set(name, true);
    users.push(new Player(name));
    ctx.cookies.set('name', new Buffer(name).toString('base64'));
    ctx.body = { code: 200 };
  }
})

home.post('/useCard', async ctx => {
  let data = ctx.request.body;

  ctx.type = 'application/json';
  
  const name = getNameByCookie(ctx);
  const user = getUserByName(name);

  switch (data.type) {
    case 'wc':
      user.useWC();
      break;
    case 'nose':
      user.useNose();
      break;
    case 'camera':
      user.useCamera();
      break;
    case 'cup':
      user.useOneCup();
    break;
    default:
      break;
  }
  ctx.body = { code: 200 }
})

function getNameByCookie(ctx) {
  const cookie = ctx.cookies.get('name');
  if (cookie) {
    const nameStr = new Buffer(cookie, 'base64').toString()
    return nameStr;
  }
  return '';
}


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


