import React from 'react';
import {Page, Toolbar,BackButton} from 'react-onsenui';


class Browser extends React.Component {

    componentDidMount = () => {
        const innerWidth = window.innerWidth;
        console.log("innerWidth:", innerWidth);
        let element = document.getElementById("browser-iframe");
        element.style.width = `${innerWidth}px`;
        console.log("success!!");
    }

    renderToolbar = () => {
        return (
            <Toolbar>
                <div className='left'>
                <BackButton>戻る</BackButton>
                </div>
            </Toolbar>
        );
        }

  render () {
    const {index} = this.props;
    const {
      naviShop,
    } = index;

    return (
      <Page renderToolbar={this.renderToolbar}>
        <div className="c-browser__iframe__wrapper">
          <iframe
            id="browser-iframe"
            className="c-browser__iframe"
            src={naviShop.urls.pc}
          />
        </div>
      </Page>
    );
  }
}

export default Browser