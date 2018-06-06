import React from 'react';
import {Page, Toolbar,BackButton} from 'react-onsenui';


class Browser extends React.Component {

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
        <iframe
          src={naviShop.urls.pc}
          style={{height: '100%', width: '100%'}}
        />
      </Page>
    );
  }
}

export default Browser