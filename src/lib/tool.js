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

const rules = {
  1: '挡一杯酒',
  2: '陪酒小姐',
  3: '动物园植物园水果园',
  4: '划拳',
  5: '照相机',
  6: '摸鼻子',
  7: '过',
  8: '厕所',
  9: '自己喝一杯',
  10: '神经病',
  11: '左边的喝一杯',
  12: '右边的喝一杯',
  13: '指定下一个K喝'
}


function getCardFromNumber(number) {
  return cards[number]
}

function getRuleFromNumber(number) {
  return rules[number]
}

export default {
  getCardFromNumber,
  getRuleFromNumber
}