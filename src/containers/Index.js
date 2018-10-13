import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {IndexActions} from '../modules/Index';

import '../../stylesheets/03_page/index.css';


class Index extends React.Component {


  render() {

    return (
      <div>
        TEST!!!
      </div>
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
