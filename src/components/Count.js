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

const BaseStoreList = [
  {label: '温州みかん', product: 1},
  {label: 'はれひめ', product: 10},
];


class ShopListPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      isSideOpen: false,
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
        {...this.props}
      />,
      tab: <Tab key="CountHome" label='Home' icon='md-home' />
    }, {
      content: <CountStore
        key="CountStore"
        BaseStoreList={BaseStoreList}
        {...this.props}
      />,
      tab: <Tab key="CountStore" label='Store' icon='md-store' />
    }];
  }

  render () {
    const {
      isSideOpen,
      tabIndex,
    } = this.state;

    const {
        index,
        chnageValueOfStorage,
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
              swipeTargetWidth="35%"
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