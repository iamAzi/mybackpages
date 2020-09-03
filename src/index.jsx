import Tool from './lib/tool'
import Ajax from './lib/ajax'
import Result from './component/result'
import anime from 'animejs'

import 'whatwg-fetch'
import './index.scss'

import gif from './img/sq.gif'
import cardImg from './img/card-bg.png'
import cardRemainImg from './img/cards-remain.png'


class App extends React.Component {
  constructor(props) {
    super(props);

    this.nameInput = React.createRef();
    this.handlePickCard = this.handlePickCard.bind(this);
    this.handleSubmitName = this.handleSubmitName.bind(this);
    this.refreshCardRemain = this.refreshCardRemain.bind(this);
    this.state = {
      username: '',
      cardVal: 0,
      rule: '',
      errorText: '请输入昵称',
      remain: 54,
      canPick: true
    }
  }

  handleSubmitName() {
    const name = this.nameInput.current.value;
    Ajax.postData('/submitName', {
      username: this.nameInput.current.value
      }).then(res => {
        if (res.code == 200) {
          this.setState({
            username: name
          })
          this.refreshCardRemain();
        } else if (res.code == 402) {
          this.setState({
            username: '',
            errorText: '名字被占用，请重新设置'
          })
        }
      });
  }

  handlePickCard() {
    if (!this.state.canPick) {
      return;
    }
    this.setState({
      canPick: false
    });
    this.timer = setTimeout(() => {
      this.setState({
        canPick: true
      })
    }, 2000);

    Ajax.getData('/pickCard').then(res => {
      console.log(res.data)
      const cardVal = res.data;
      let rule = Tool.getRuleFromCardVal(cardVal);
      this.setState({
        cardVal: cardVal,
        rule: rule
      })
      anime({
        targets: '.card-img',
        rotateX: ['0deg', '360deg'],
        easing: 'easeOutElastic(1, .8)'
      });
    }).then(() => {
      this.refreshCardRemain()
    })
  }

  refreshCardRemain() {
    Ajax.getData('/getCardsRemain').then(res => {
      console.log(res.data)
      const remain = res.data;
      this.setState({
        remain: remain
      })
    })
  }

  render() {
    return (
        <div className='wrapper'>
          { !this.state.username &&
            <div className="name-area">
              <div className='title'>欢迎来到<br/>健康运动卡牌游戏</div>
              <img className='squat-gif' src={gif}/>
              <div className='error-text'>{this.state.errorText}</div>
              <input className="name-input" type="text" ref={this.nameInput}/>
              <div className="confirm-btn" onClick={this.handleSubmitName}>确认</div>
            </div>
          }
          {
            this.state.username && (
              <div>
                <div className='username'>你好，「{this.state.username}」</div>
                <img className='card-img' src={cardImg}/>
                {
                  this.state.cardVal ? <Result {...this.state} />
                  : null
                }
                <div className='button' onClick={this.handlePickCard}>{this.state.canPick ? '点击发牌' : '请等待'}</div>
                <div className='cards-remain'>
                  <img className='remain-icon' src={cardRemainImg} onClick={this.refreshCardRemain}/>
                  <div className='remain-number'>{this.state.remain}</div>
                </div>
              </div>
            )
          }

        </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
