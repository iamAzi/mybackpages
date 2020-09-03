import Tool from './lib/tool'
import Ajax from './lib/ajax'
import Result from './component/result'
import anime from 'animejs'

import 'whatwg-fetch'
import './index.scss'

import introIcon from './img/intro-icon.png'
import cardImg from './img/card-bg.png'
import cardRemainImg from './img/cards-remain.png'
import refreshIcon from './img/refresh.png'


class App extends React.Component {
  constructor(props) {
    super(props);

    this.nameInput = React.createRef();
    this.handlePickCard = this.handlePickCard.bind(this);
    this.handleSubmitName = this.handleSubmitName.bind(this);
    this.refreshCardRemain = this.refreshCardRemain.bind(this);
    this.handleGetUserStatus = this.handleGetUserStatus.bind(this);
    this.state = {
      name: '',
      cardVal: 0,
      rule: '',
      errorText: '请输入昵称',
      remain: 54,
      canPick: true,
      wc: 0,
      nose: 0,
      oneCup: 0,
      camera: 0,
      cheapGirl: false,
      stupid: false,
    }
  }

  componentDidMount() {
    Ajax.getData('/init').then(res => {
      if (res.name) {
        this.setState({
          name: res.name
        }, () => {
          this.handleGetUserStatus();
        })
      }
    })
  }

  handleSubmitName() {
    const name = this.nameInput.current.value;
    Ajax.postData('/submitName', {
      name: this.nameInput.current.value
      }).then(res => {
        if (res.code == 200) {
          this.setState({
            name: name
          })
          this.refreshCardRemain();
        } else if (res.code == 402) {
          this.setState({
            name: '',
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
    }, 100);

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
      this.handleGetUserStatus();
    })
  }

  handleGetUserStatus() {
    Ajax.getData('/userStatus').then(res => {
      this.setState({
        ...res
      })
            
      anime({
        targets: '.refresh-btn',
        rotateY: ['0deg', '360deg'],
        scale: [5, 1],
        duration: 2000,
        easing: 'easeOutElastic(1, .8)'
      });
    })
    this.refreshCardRemain();
  }

  handleUseCard(type) {
    Ajax.postData('/useCard', {type}).then(res => {
      this.handleGetUserStatus();
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
    let special = '';
    if (this.state.cheapGirl && this.state.stupid) {
      special = (
        <div className='special'>陪酒小姐<br/>神经病</div>
      )
    } else if (this.state.cheapGirl) {
      special = (
        <div className='special'>陪酒小姐</div>
      )
    } else if (this.state.stupid) {
      special = (
        <div className='special'>神经病</div>
      )
    }
    return (
        <div className={'wrapper '}>
          { !this.state.name &&
            <div className="name-area">
              <div className='title'>欢迎来到<br/>健康运动卡牌游戏</div>
              <img className='squat-gif' src={introIcon}/>
              <div className='error-text'>{this.state.errorText}</div>
              <input className="name-input" type="text" ref={this.nameInput}/>
              <div className="confirm-btn" onClick={this.handleSubmitName}>确认</div>
            </div>
          }
          {
            this.state.name && (
              <div className='gaming'>
                {
                  special
                }
                <div className='info-area'>
                  <div className='magic' onClick={this.handleUseCard.bind(this, 'wc')}>厕所：{this.state.wc}</div>
                  <div className='magic' onClick={this.handleUseCard.bind(this, 'nose')}>鼻子：{this.state.nose}</div>
                  <div className='magic' onClick={this.handleUseCard.bind(this, 'camera')}>照相：{this.state.camera}</div>
                  <div className='magic' onClick={this.handleUseCard.bind(this, 'cup')}>挡酒：{this.state.oneCup}</div>
                </div>
                <div className='username'>你好，「{this.state.name}」</div>
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
                <img className='refresh-btn' src={refreshIcon} onClick={this.handleGetUserStatus}/>
              </div>
            )
          }

        </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
