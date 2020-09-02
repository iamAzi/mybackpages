import React from 'react'
import ReactDOM from 'react-dom'

import './index.scss'

class App extends React.Component {
  render() {
    return (
        <div className='wrapper'>This is Azi</div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));