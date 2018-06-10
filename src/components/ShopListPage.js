import React from 'react';
import {is} from 'immutable';
import uaparse from 'ua-parser-js';
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
} from 'react-onsenui';

import Navigation from './Navigation';
import Browser from './Browser';
import MyStoreCheckout from '../components/Stripe/MyStoreCheckout';


const rangeList = [
  {value: "1", label: '300m以内'},
  {value: "2", label: '500m以内'},
  {value: "3", label: '1km以内'},
  {value: "4", label: '2km以内'},
  {value: "5", label: '3km以内'},
]


class ShopListPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      isSideOpen: false,
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const {
      params,
      selectedCategory,
    } = this.props.index;

    const nextParams = nextProps.index.params;
    const nextSelectedCategory = nextProps.index.selectedCategory;

    // paramsにその他の変更があった場合
    if (!is(nextParams, params)) {
      this.setState({selectedIndex: 0})
      const _params = nextParams.toJS();
      this.props.getSearchResult({params: _params});
    }

    if (nextSelectedCategory !== selectedCategory) {
      this.props.changeValueOfParams({key: 'food', value: ""})
      this.props.getFood({food_category: nextSelectedCategory})
    }
  }

  componentDidMount = () => {
    const ua = uaparse(window.navigator.userAgent);
    let isSafari = ua.browser.name === 'Mobile Safari';

    if (isSafari) {
      if (!window.navigator.standalone) {
        const lh_close = localStorage.getItem('lh_close') || 0
        if (Number(lh_close) < 2) {
          localStorage.setItem('lh_close', String(Number(lh_close) + 1))

          setTimeout(() => {
            this.props.changeValueForKey({key: 'isToast', value: true})
          }, 3000)

        }
      }
    }
  }

  setNavigationPosition = () => {
    const selectedShop = this.props.index.searchResult.shop[this.state.selectedIndex];
    this.props.changeValueForKey({key: 'naviShop',  value: selectedShop});
    this.props.navigator.pushPage({component: Navigation, key: 'Navigation'});
  }

  setBrowserShop = () => {
    const selectedShop = this.props.index.searchResult.shop[this.state.selectedIndex];
    this.props.changeValueForKey({key: 'naviShop',  value: selectedShop});
    this.props.navigator.pushPage({component: Browser, key: 'Browser'});
  }

  getCurrentPosition = () => {
    if (!navigator.geolocation) {
      this.setState({
          isAlertOpen: true,
          alertMessage: 'この端末では\n現在地を取得できません'
      })
      return;
    }

    this.props.changeValueForKey({key: 'isProgress', value: true});

    navigator.geolocation.getCurrentPosition(
      this.successGetCurrentPosition,
      this.failedGetCurrentPosition,
      {enableHighAccuracy: true},
    );

  }

  successGetCurrentPosition = (position) => {
    const {
      latitude,
      longitude,
    } = position.coords;

    let params = this.props.index.params;
    params = params.set('latitude', latitude);
    params = params.set('longitude', longitude)

    this.props.changeValueForKey({key: 'params', value: params})
    this.props.getSearchResult({params: params.toJS()});
  }

  failedGetCurrentPosition = (error) => {
    this.props.changeValueForKey({key: 'isLoading', value: false});
  var errorMessage = {
  0: "原因不明のエラーが\n発生しました" ,
      1: "位置情報の取得が\n許可されませんでした\n\n位置情報の取得を\n許可してください" ,
  2: "電波状況などで\n位置情報が取得できませんでした" ,
  3: "位置情報の取得に\n時間がかかり過ぎて\n失敗しました" ,
  };
    this.setState({
      isAlertOpen: true,
      alertMessage: errorMessage[error.code]
    })
  }

  renderToolbar = () => {
    const searchResult = this.props.index.searchResult;
    return (
        <Toolbar>
          <div className='center' style={{fontWeight: 'bold'}}>
            {searchResult.shop.length > 0 ? `${searchResult.shop[0].small_area.name}付近のお店` : '見つかりませんでした'}
          </div>

            <div className="right" style={{padding: '5px'}}>
            {this.props.index.isProgress &&
              <ProgressCircular indeterminate/>
            }
            </div>
          }
      </Toolbar>
    );
  }

  renderFixed = () => {
    return (
      <div>
        <Fab
          position="bottom right"
          ripple={true}
          onClick={this.setNavigationPosition}
        >
        <Icon
          icon="md-google-maps"
        />

      </Fab>
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
  render () {
    const {
      selectedIndex,
      isSideOpen,
    } = this.state;

    const {
        index,
        changeValueOfParams,
        changeValueForKey,
        sendStripeToken,
      } = this.props;

      const {
        params,
        // isLoading,
        // message,
        searchResult,
        foodCategory,
        selectedCategory,
        food,
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
              swipeTargetWidth="35%"
              isOpen={isSideOpen}
              onClose={() => this.setState({isSideOpen: false})}
              onOpen={() => this.setState({isSideOpen: true})}
            >
              <Page>
                <ListHeader>フィルター</ListHeader>
                <div className="p-index__side__switch">
                  <Switch
                    checked={params.get('lunch') === 1}
                    onChange={(e) => changeValueOfParams({key: 'lunch', value: e.target.checked ? 1 : 0})}
                  />
                  <p>ランチあり</p>
                </div>
                <div className="p-index__side__switch">
                  <Switch
                    checked={params.get('wifi') === 1}
                    onChange={(e) => changeValueOfParams({key: 'wifi', value: e.target.checked ? 1 : 0})}
                  />
                  <p>Wi-Fiあり</p>
                </div>
                <ListHeader>距離</ListHeader>
                <div className="p-index__side__select">
                  <Select
                    value={params.get('range')}
                    onChange={(e) => changeValueOfParams({key: 'range', value: e.target.value})}
                  >
                    {rangeList.map((category, index) => {
                      return (
                        <option key={index} value={category.value}>{category.label}</option>
                      );
                    })}
                  </Select>
                </div>
                <ListHeader>カテゴリ（料理名を絞り込み）</ListHeader>
                <div className="p-index__side__select">
                  <Select
                    value={selectedCategory}
                    onChange={(e) => changeValueForKey({key: 'selectedCategory', value: e.target.value})}
                  >
                    <option value="">なし</option>
                    {foodCategory.map((category, index) => {
                      return (
                        <option key={index} value={category.code}>{category.name}</option>
                      );
                    })}
                  </Select>
                </div>
                <ListHeader>料理名</ListHeader>
                <div className="p-index__side__select">
                  <Select
                    value={params.get('food')}
                    onChange={(e) => changeValueOfParams({key: 'food', value: e.target.value})}
                  >
                    <option value="">なし</option>
                    {food.map((category, index) => {
                      return (
                        <option key={index} value={category.code}>{category.name}</option>
                      );
                    })}
                  </Select>
                </div>
                <ListHeader>再検索</ListHeader>
                <div className="p-index__side__contact__button">
                  <Button
                    className="p-index__side__contact__button__child"
                    onClick={() => this.getCurrentPosition()}
                    style={{textAlign: 'center'}}
                  >
                    <p className="p-index__side__contact__button__inner">現在地を更新する</p>
                  </Button>
                </div>
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
              {/* <Modal
              isOpen={isLoading}
              animation="fade"
            >
              <div className="modal__body">
                <p className="modal__message">{message}</p>
                <div className="loading-modal">
                  <div className="pac-man" />
                </div>
              </div>
            </Modal> */}
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
                アプリをインストールできます
              </div>
              <Icon
                icon="md-close"
                size={30}
                style={{color: 'white'}}
                onClick={() => changeValueForKey({key: 'isToast', value: false})}
              />
            </Toast>
            <Page
              renderToolbar={this.renderToolbar}
              renderFixed={this.renderFixed}
            >
            <div className="p-index">
              <div className="c-shop-list-page">
                <div style={{textAlign: 'center',fontSize: '20px', paddingTop: '20px'}}>
                    {searchResult.shop.map((result, index) => (
                        <span
                          key={index}
                          style={{cursor: 'pointer'}}
                          onClick={() => this.setState({selectedIndex: index})}
                        >
                        {selectedIndex === index ? '\u25CF' : '\u25CB'}
                        </span>
                    ))}
                </div>
                <Carousel
                    onPostChange={(e) => this.setState({selectedIndex: e.activeIndex})}
                    index={selectedIndex}
                    swipeable={true}
                    autoScroll={true}
                    overscrollable={true}
                    autoScrollRatio={0.1}
                >
                {searchResult.shop.map((result, index) => {
                    return (
                    <CarouselItem key={index}>
                        <div className="c-shop-list-page__card">
                          <figure className="c-shop-list-page__card__image-box__wrapper">
                            <div className="c-shop-list-page__card__image-box">
                              <div className="c-shop-list-page__card__image-box__image">
                                <img src={result.photo.pc.l} role="presentation"/>
                              </div>
                            </div>
                          </figure>
                          <div className="c-shop-list-page__card__content">
                            <div className="c-shop-list-page__card__content__name-kana">
                              {result.name_kana}
                            </div>
                            <div className="c-shop-list-page__card__content__name">
                              {result.name}
                            </div>
                            <div className="c-shop-list-page__card__content__open">
                              {result.open}
                            </div>
                            <div className="c-shop-list-page__card__content__close">
                              定休日 {result.close}
                            </div>
                            <div className="c-shop-list-page__card__content__ganre-catch">
                              {result.genre.catch}
                            </div>
                            <div style={{textAlign: 'center'}}>
                              <Button
                                onClick={() => this.setBrowserShop()}
                                modifier="quiet"
                                style={{fontSize: '12px', marginBottom: '-10px', color: 'gray'}}
                              >
                                ホットペッパーグルメで見る
                              </Button>
                            </div>
                            <div className="c-shop-list-page__card__content__food-name">
                              {result.food.name}
                            </div>

                          </div>

                        </div>
                    </CarouselItem>
                    );
                })}
                </Carousel>
                {/* <div className="c-shop-list-page__bottom">
                  {searchResult.shop.length > 0 &&
                    <Button
                      className="c-shop-list-page__bottom__button"
                      modifier="large"
                      onClick={this.setNavigationPosition}
                    >
                      ここに向かう
                    </Button>
                  }
                </div> */}
              </div>
            </div>
            </Page>
          </SplitterContent>
        </Splitter>
      </Page>
    );
  }
}

export default ShopListPage;