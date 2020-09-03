import './index.scss';

function Result(props) {
  return (
    <div className='result-area'>
      你抽到的牌是
      <div className='number'>
        {props.cardVal}
      </div>
      <div className='rule'>
        {props.rule}
      </div>
    </div>
  )
}
export default Result;
