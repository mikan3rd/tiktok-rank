import React from 'react';
import {Page ,Button} from 'react-onsenui';

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
    const clickCount = storage.get('clickCount');
    this.props.chnageValueOfStorage({key: 'clickCount', value: clickCount + 1})

    const count = storage.get('count');
    const storeList = storage.get('storeList')
    const firstStore = storeList[0] || 0;
    this.props.chnageValueOfStorage({key: 'count', value: firstStore + count + 1})
  }

  onSave = () => {
    const {storage} = this.props.index;
    localStorage.setItem('mcStorage', JSON.stringify(storage.toJS()));
  }


  render() {
    const {
      index,
    } = this.props;

    const {
      storage,
    } = index;

    // console.log(this.props.index);

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
            {storage.get('count')} mikans
          </div>
          <div className="c-count-home__click-count">
            {storage.get('clickCount')} clicks
          </div>

          {/* <div className="c-count-home__save">
            <Button
              className="c-count-home__save__button"
              modifier="large"
              onClick={() => this.onSave()}
            >
              <p className="c-count-home__save__button__text">Save</p>
            </Button>
          </div> */}

        </div>

      </Page>
    );
  }
}

export default CountHome;