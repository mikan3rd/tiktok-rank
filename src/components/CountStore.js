import React from 'react';
import {Page, LazyList, ListItem} from 'react-onsenui';
import CountUp from 'react-countup';

class CountStore extends React.Component {

  renderStore = (i) => {
    const {
      BaseStoreList,
      index,
    } = this.props;

    const {
      storage,
    } = index;

    const baseStore = BaseStoreList[i];

    if (!baseStore) {
      return (
        <ListItem key={i}>
          no more mikan...
        </ListItem>
      );
    }

    let {
      label,
      description,
      cost,
      image,
    } = baseStore;

    const store = storage.get('storeList')[i];
    const num = store ? Number(store) : 0;
    const count = storage.get('count');

    if (num == 0 && count < cost) {
      return (
        <ListItem
          key={i}
          style={{backgroundColor: 'gray'}}
        >
          <div className='left'>
            <img
              className='c-count-store__item__image'
              src={image}
            />
          </div>
          <div className='center c-count-store__item__center'>
            <div className="c-count-store__item__title">？？？</div>
            <div className="c-count-store__item__cost">
              <div className="c-count-store__item__cost__image">
                <img src="./images/mikan.png" role="presentation" />
              </div>
              {cost}
            </div>
            {/* <div className='c-count-store__item__source'>画像: {image}</div> */}
          </div>
      </ListItem>
      );
    }

    if (num > 0) {
      cost =  Math.round(cost * 1.15 * num);
    }
    const listClass = count < cost ? "c-count-store__list--gray" : "";

    return(
      <ListItem
        key={i}
        onClick={() => this.buyStore(i, cost, count)}
        className={listClass}
      >
        <div className='left'>
          <img
            className='c-count-store__item__image'
            src={image}
          />
        </div>
        <div className='center c-count-store__item__center'>
          <div className="c-count-store__item__title">{label}</div>
          <div className="c-count-store__item__desc">{description}</div>
          <div className="c-count-store__item__cost">
            <div className="c-count-store__item__cost__image">
              <img src="./images/mikan.png" role="presentation" />
            </div>
            {cost}
          </div>
          {/* <div className='c-count-store__item__source'>画像: {image}</div> */}
          <div className="c-count-store__item__num">{num}</div>
        </div>
      </ListItem>
    );

  }

  buyStore = (index, cost, count) => {

    if (count < cost) {
      console.log("足りません");
      return;
    }

    let storeList = this.props.index.storage.get('storeList');
    if (storeList[index]) {
      storeList[index] = Number(storeList[index]) + 1;
    } else {
      storeList.push(1);
    }
    this.props.buyStore({storeList, cost})
  }

  render() {
    const {
      BaseStoreList,
      index,
      start,
    } = this.props;

    const {
      storage,
    } = index;

    return (
      <Page renderFixed={this.renderFixed}>
        <div className="c-count-store__count">
          <CountUp
            start={start}
            end={storage.get('count')}
            duration={1}
            useEasing={false}
            useGrouping={true}
            separator=","
          /> mikans
        </div>
        <div className="c-count-store__list">
        <LazyList
          length={storage.get('storeList').length + 1}
          renderRow={this.renderStore}
          calculateItemHeight={() => 125}
        />
        </div>
      </Page>
    );
  }
}

export default CountStore;