import React from 'react'
import ReactDOM from 'react-dom'
import Tool from './lib/tool'
import './index.scss'
import cardImg from './img/card-bg.png'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handlePickCard = this.handlePickCard.bind(this);
    this.state = {
      cardVal: 0,
      rule: ''
    }
  }

  handlePickCard() {
    let number = Math.ceil(Math.random() * 13);
    console.log(number)
    let cardVal = Tool.getCardFromNumber(number);
    let rule = Tool.getRuleFromNumber(number);
    this.setState({
      cardVal: cardVal,
      rule: rule
    })
  }

  render() {
    return (
        <div className='wrapper'>
          <img className='card-img' src={cardImg}/>
          {
            this.state.cardVal ? <div className='result-area'>
              你抽到的牌是
              <div className='number'>
                {this.state.cardVal}
              </div>
              <div className='rule'>
                {this.state.rule}
              </div>
            </div>
            : null
          }
          <div className='button' onClick={this.handlePickCard}>点击发牌</div>
        </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
