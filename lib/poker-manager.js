let defaultCards = new Array(54).fill(-1);

defaultCards = defaultCards.map((item, idx) => {
  return idx;
})

const cards = {
  1: 'A',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  10: '10',
  11: 'J',
  12: 'Q',
  13: 'K'
}

class Manager {
  constructor() {
    this.cards = Array.from(defaultCards);
    this.messUpCards();
  }

  transformNumberToPoker(num) {
    /*
      0-13 红桃
      13-25 黑桃
      26-38 梅花
      39-51 方片
      52 小王
      53 大王
     */
    if (num == 53) {
      return 'Big Joker'
    } else if (num == 52) {
      return 'Joker'
    } else {
      return `${cards[(num % 13)+1]}`
    }
  }

  getTopCard() {
    let num = this.cards.shift();
    if (this.cards.length == 0) {
      this.refreshCards();
    }
    return this.transformNumberToPoker(num);
  }

  getCardsRemain() {
    return this.cards.length;
  }

  messUpCards() {
    const cardNum = this.cards.length;
    for(let i = 0; i < cardNum; i++) {
      const rand = Math.floor(Math.random() * (cardNum-1));
      let temp = this.cards[i];
      this.cards[i] = this.cards[rand];
      this.cards[rand] = temp;
    }
  }

  refreshCards() {
    this.cards = Array.from(defaultCards);
    this.messUpCards();
  }
}

module.exports = Manager;
