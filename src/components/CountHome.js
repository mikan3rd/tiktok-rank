import React from 'react';
import {Page ,Button} from 'react-onsenui';
import CountUp from 'react-countup';

class CountHome extends React.Component {

  constructor(props) {
    super(props);
  }

  onClickImage = () => {
    var target_mikan = document.getElementById('target_mikan');
    target_mikan.classList.remove("animation-target");
    target_mikan.offsetWidth;
    target_mikan.classList.add("animation-target");

    const {storage} = this.props.index;
    const clickCount = Number(storage.get('clickCount'));
    this.props.changeValueOfStorage({key: 'clickCount', value: clickCount + 1})

    const count = Number(storage.get('count'));
    const storeList = storage.get('storeList')
    const firstStore = storeList[0] || 0;
    this.props.changeValueOfStorage({key: 'count', value: Math.round(firstStore * 0.1 + count + 1)})
  }

  render() {
    const {
      index,
      start,
      sum,
    } = this.props;

    const {
      storage,
    } = index;

    return (
      <Page>
        <div className="p-index">
          <div className="c-count-home__logo">
            <img src="./images/title.jpg" role="presentation" />
          </div>
          <div className="c-count-home__mikan">
            <img
              id="target_mikan"
              className="animation-target"
              src="./images/mikan.png"
              onClick={this.onClickImage}
            />
          </div>
          <div className="c-count-home__count">
            <CountUp
              start={start}
              end={storage.get('count')}
              duration={1}
              useEasing={false}
              useGrouping={true}
              separator=","
            /> mikans
          </div>
          <div className="c-count-home__sum">
             + {sum}
          </div>
          <div className="c-count-home__click-count">
            {storage.get('clickCount')} clicks
          </div>

        </div>

      </Page>
    );
  }
}

export default CountHome;