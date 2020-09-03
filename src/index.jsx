import Tool from './lib/tool'
import cardImg from './img/card-bg.png'
// import Result from './component/result/index'
import 'whatwg-fetch'
import './index.scss'

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
    fetch('/pickCard', {
      headers: {
      'Content-Type': 'application/json'
      }
    }).then(response => {
      return response.json().then(res => {
        console.log(res.data)
        const number = res.data;
        let cardVal = Tool.getCardFromNumber(number);
        let rule = Tool.getRuleFromNumber(number);
        this.setState({
          cardVal: cardVal,
          rule: rule
        })
      })
    })
  }

  render() {
    return (
        <div className='wrapper'>
          <img className='card-img' src={cardImg}/>
          {
            // this.state.cardVal ? <Result {...this.state} />
            // : null
          }
          <div className='button' onClick={this.handlePickCard}>点击发牌</div>
        </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
