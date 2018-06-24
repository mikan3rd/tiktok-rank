import React from 'react';
import {is} from 'immutable';
import uaparse from 'ua-parser-js';
import $ from 'jquery';
import '../../public/JQuery-Snowfall/dist/snowfall.jquery.min.js'
import {
  Page,
  // Modal,
  Carousel,
  CarouselItem,
  Button,
  Icon,
  Toolbar,
  // ToolbarButton,
  Splitter,
  SplitterContent,
  SplitterSide,
  ListHeader,
  Switch,
  Select,
  Fab,
  ProgressCircular,
  Toast,
  Tabbar,
  Tab,
} from 'react-onsenui';

import MyStoreCheckout from '../components/Stripe/MyStoreCheckout';
import CountHome from '../components/CountHome';
import CountStore from '../components/CountStore';
import Ranking from '../components/Ranking';

const BaseStoreList = [{
    label: '温州みかん',
    cost: 15,
    product: 0.1,
    description: '味と食べやすさを兼ね備えた、かんきつ王国愛媛の顔。夏場の温室みかんは贈答品に最適。',
    image: 'http://kochi-marugoto.com/wp/wp-content/uploads/2017/03/mikan01.jpg',
  },{
    label: 'オレンジ',
    cost: 110,
    product: 1,
    description: 'ミカン目ミカン科ミカン属オレンジ種。よくジュースにされている。',
    image: 'https://shiru2.jp/toushitsu/wp-content/uploads/2016/12/1111-13.jpg',
  },{
    label: '清見',
    cost: 1100,
    product: 8,
    description: 'みかんにオレンジを交配。豊富な果汁とまろやかな果肉が特徴。カットフルーツに最適。',
    image: 'https://blog-001.west.edge.storage-yahoo.jp/res/blog-73-eb/nagomi_yst/folder/225426/53/24179653/img_1?1363525304',
  },{
    label: 'オセオラ',
    cost: 12000,
    product: 47,
    description: 'フロリダ大学のガードナー博士、ベロース博士らによって育成された交雑のタンゼリンタンゼロで、クレメンティンにオーランドを交配して育成された品種である。',
    image: 'http://fukujyuen.net/lib/upload/save_image/oseora_main01b.jpg',
  },{
    label: 'はれひめ',
    cost: 130000,
    product: 260,
    description: '清見とオセオラとみかんを交配。手で皮がむけ、内袋ごと食べられる爽やかなオレンジ風味が特徴。',
    image: 'http://noumin.jp/image/kankitsu/harehime.JPG',
  },{
    label: 'ポンカン',
    cost: 1400000,
    product: 1400,
    description: 'インド原産で日本に伝来。手で皮がむけ、内袋ごと食べられ、甘味の強さと香りが特徴',
    image: 'https://kotobank.jp/image/dictionary/nipponica/media/81306024002433.jpg',
  },
];


class ShopListPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      isSideOpen: false,
      intervalId: null,
      start: 0,
      sum: 0,
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const nextStorage = nextProps.index.storage;
    const {storage} = this.props.index;

    if (!is(nextStorage, storage)) {
      localStorage.setItem('mcStorage', JSON.stringify(nextStorage.toJS()));
    }

  }

  componentDidMount = () => {

    const ua = uaparse(window.navigator.userAgent);
    let isSafari = ua.browser.name === 'Mobile Safari';

    if (isSafari) {
      if (!window.navigator.standalone) {
        const mc_toast = localStorage.getItem('mc_toast') || 0
        if (Number(mc_toast) < 2) {
          localStorage.setItem('mc_toast', String(Number(mc_toast) + 1))

          setTimeout(() => {
            this.props.changeValueForKey({key: 'isToast', value: true})
          }, 3000)

        }
      }
    }

    const intervalId = setInterval(this.autoIncrease, 1000);
    this.setState({intervalId: intervalId});

  }

  componentWillUnmount = () => {
    clearInterval(this.state.intervalId);
  }

  autoIncrease = () => {
    const {storage} = this.props.index;
    let count = Number(storage.get('count').toFixed(1));
    let sum = 0;
    for (const [i, num] of storage.get('storeList').entries()) {
      const BaseStore = BaseStoreList[i];
      sum += Number(Number(BaseStore['product'] * num).toFixed(1));
    }
    const value = count + sum;
    this.props.changeValueOfStorage({key: 'count', value: Number(value.toFixed(1))});
    this.setState({sum, start: storage.get('count')})
  }

  renderFixed = () => {
    return (
      <div>
        <Fab
          position="bottom left"
          ripple={true}
          onClick={() => this.setState({isSideOpen: !this.state.isSideOpen})}
        >
          <Icon
            icon="md-settings"
          />
        </Fab>
      </div>
    );
  }

  renderTabs = () => {
    return [{
      content: <CountHome
        key="CountHome"
        BaseStoreList={BaseStoreList}
        {...this.state}
        {...this.props}
      />,
      tab: <Tab key="CountHome" label='Home' icon='md-home' />
    }, {
      content: <CountStore
        key="CountStore"
        BaseStoreList={BaseStoreList}
        {...this.state}
        {...this.props}
      />,
      tab: <Tab key="CountStore" label='Store' icon='md-store' />
    }, {
        content: <Ranking
        key="Ranking"
        BaseStoreList={BaseStoreList}
        {...this.props}
      />,
      tab: <Tab key="Ranking" label='Ranking' icon='fa-list-ol' />
    }];
  }

  render () {
    const {
      isSideOpen,
      tabIndex,
    } = this.state;

    const {
        index,
        changeValueOfStorage,
        changeValueForKey,
        sendStripeToken,
      } = this.props;

      const {
        storage,
        isOpenModal,
        isToast,
      } = index;

    return (
        <Page>
          <Splitter>
            <SplitterSide
              style={{
                boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
              }}
              side="left"
              width={200}
              collapse={true}
              swipeable={true}
              swipeTargetWidth="40%"
              isOpen={isSideOpen}
              onClose={() => this.setState({isSideOpen: false})}
              onOpen={() => this.setState({isSideOpen: true})}
            >
              <Page>
                <ListHeader>作者について</ListHeader>
                <div className="p-index__side__contact__button">
                  <Button
                    className="p-index__side__contact__button__child"
                    modifier="outline"
                    onClick={() => window.open('https://marshmallow-qa.com/mikan_the_third?utm_medium=twitter&utm_source=promotion')}
                  >
                    <p className="p-index__side__contact__button__inner">作者にメッセージを送る</p>
                  </Button>
                  <MyStoreCheckout
                    isOpenModal={isOpenModal}
                    changeValueForKey={changeValueForKey}
                    sendStripeToken={sendStripeToken}
                />
                </div>
              </Page>
            </SplitterSide>
            <SplitterContent>
              <Toast
                isOpen={isToast}
              >
              <div
                className="message"
                style={{
                  whiteSpace:'pre-wrap',
                  padding: '10px',
                  lineHeight: '2',
                }}
              >
                画面下の共有ボタン <Icon icon="ion-share" size={30} /> を押して{'\n'}
                ホーム画面に追加 <Icon icon="fa-plus-square" size={30} /> すると{'\n'}
                アプリをインストールできます（Safariの場合のみ）
              </div>
              <Icon
                icon="md-close"
                size={30}
                style={{color: 'white'}}
                onClick={() => changeValueForKey({key: 'isToast', value: false})}
              />
            </Toast>
            <Page
              // renderFixed={this.renderFixed}
            >
              <Tabbar

                swipeable={true}
                position='auto'
                index={this.state.tabIndex}
                onPreChange={(event) =>
                  {
                    if (event.index != this.state.tabIndex) {
                      this.setState({tabIndex: event.index});
                    }
                  }
                }
                renderTabs={this.renderTabs}
              />
            </Page>
          </SplitterContent>
        </Splitter>
      </Page>
    );
  }
}

export default ShopListPage;