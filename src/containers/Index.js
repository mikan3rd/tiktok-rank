import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  Navigator,
} from 'react-onsenui';

import {IndexActions} from '../modules/Index';
import FirstPage from '../components/FirstPage';

import '../../stylesheets/03_page/index.css';


class Index extends React.Component {

  handleOnKeyPress = (e) => {
    if (e.key === 'Enter') {

    }
  }

  renderPage = (route, navigator) => {
    // console.log(route, navigator);
    return (
        <route.component
          key={route.key}
          navigator={navigator}
          {...this.props}
        />
    );

  }


  render() {

    return (
      <Navigator
        renderPage={this.renderPage}
        initialRoute={{component: FirstPage, key: 'FirstPage'}}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    index: state.index,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return bindActionCreators(IndexActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
