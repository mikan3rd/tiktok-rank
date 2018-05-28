import React from 'react';
import {Page, Modal, Carousel, CarouselItem, Button} from 'react-onsenui';
import Navigation from './Navigation';

class ShopListPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedIndex: 0,
    }
  }

  setNavigationPosition = () => {
    const selectedShop = this.props.index.searchResult.shop[this.state.selectedIndex];
    console.log("shop", selectedShop);
    this.props.changeValueForKey({key: 'naviShop',  value: selectedShop});
    this.props.navigator.pushPage({component: Navigation, key: 'Navigation'});
  }

  render () {
    const {
      selectedIndex,
    } = this.state;

    const {
        index,
      } = this.props;

      const {
        isLoading,
        message,
        searchResult,
      } = index;

    return (
      <Page>
          <Modal
            isOpen={isLoading}
            animation="fade"
          >
            <div className="modal__body">
              <p className="modal__message">{message}</p>
              <div className="loading-modal">
                <div className="pac-man" />
              </div>
            </div>
          </Modal>
          <div className="c-shop-list-page">
            <div className="c-shop-list-page__top">
              {searchResult.shop[0].small_area.name}付近のお店
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
      </Page>
    );
  }
}

export default ShopListPage;