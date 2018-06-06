import React from 'react';
import {is} from 'immutable';
import {
  Page,
  Modal,
  Carousel,
  CarouselItem,
  Button,
  Icon,
  Toolbar,
  ToolbarButton,
  Splitter,
  SplitterContent,
  SplitterSide,
  ListHeader,
  Switch,
  Select,
} from 'react-onsenui';
import Navigation from './Navigation';


const rangeList = [
  {value: "1", label: '300m'},
  {value: "2", label: '500m'},
  {value: "3", label: '1000m'},
  {value: "4", label: '2000m'},
  {value: "5", label: '3000m'},
]


class ShopListPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedIndex: 0,
      isSideOpen: false,
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const {
      params,
    } = this.props.index;
    const nextParams = nextProps.index.params;

    // paramsにその他の変更があった場合
    if (!is(nextParams, params)) {
      const _params = nextParams.toJS();
      this.props.getSearchResult({params: _params});
    }
  }

  setNavigationPosition = () => {
    const selectedShop = this.props.index.searchResult.shop[this.state.selectedIndex];
    this.props.changeValueForKey({key: 'naviShop',  value: selectedShop});
    this.props.navigator.pushPage({component: Navigation, key: 'Navigation'});
  }

  renderToolbar = () => {
    const searchResult = this.props.index.searchResult;
    return (
        <Toolbar>
          <div className='center' style={{fontWeight: 'bold'}}>
            {searchResult.shop[0].small_area.name}付近のお店
          </div>
          <div className='right'>
            <ToolbarButton
              style={{color: 'black'}}
              onClick={() => this.setState({isSideOpen: !this.state.isSideOpen})}
            >
              <Icon
                icon="md-settings"
                size={30}
              />
            </ToolbarButton>
          </div>
      </Toolbar>
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
      } = this.props;

      const {
        params,
        // isLoading,
        // message,
        searchResult,
      } = index;

    return (
        <Page>
          <Splitter>
            <SplitterSide
              style={{
                boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
              }}
              side="right"
              width={200}
              collapse={true}
              swipeable={true}
              swipeTargetWidth="35%"
              isOpen={isSideOpen}
              onClose={() => this.setState({isSideOpen: false})}
              onOpen={() => this.setState({isSideOpen: true})}
            >
              <Page>
                <ListHeader>距離</ListHeader>
                <div className="p-index__side__select">
                  <Select
                    value={rangeList.find((category) => category.value === params.get('range')).value}
                    onChange={(e) => changeValueOfParams({key: 'range', value: e.target.value})}
                  >
                    {rangeList.map((category, index) => {
                      return (
                        <option key={index} value={category.value}>{category.label}</option>
                      );
                    })}
                  </Select>
                </div>
                <ListHeader>フィルター</ListHeader>
                <div className="p-index__side__switch">
                  <Switch
                    checked={params.get('lunch') === 1}
                    onChange={(e) => changeValueOfParams({key: 'lunch', value: e.target.checked ? 1 : 0})}
                  />
                  <p>ランチあり</p>
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
            <Page
              renderToolbar={this.renderToolbar}
            >
            <div className="p-index">
              <div className="c-shop-list-page">
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
                            <div className="c-shop-list-page__card__content__food-name">
                              {result.food.name}
                            </div>

                          </div>

                        </div>
                    </CarouselItem>
                    );
                })}
                </Carousel>
                <div style={{textAlign: 'center',fontSize: '20px'}}>
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
                <div className="c-shop-list-page__bottom">
                    <Button
                      className="c-shop-list-page__bottom__button"
                      modifier="large"
                      onClick={this.setNavigationPosition}
                    >
                      ここに向かう
                    </Button>
                </div>
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