import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {IndexActions} from '../modules/Index';
import UserRank from '../components/UserRank';

import '../../stylesheets/03_page/index.css';


class Index extends React.Component {

  render() {

    const {
      index,
      getUserResult,
    } = this.props;

    const {
      userResult,
    } = index;

    return (
      <div className="p-index__wrapper">
        <div className="p-index">
          <div className="p-index__title">
            <img src="./images/title.jpg" role="presentation" />
          </div>
          <p className="p-index__desc">日本版TikTokをランキング形式でまとめた非公式サイトです</p>
          <UserRank
            getUserResult={getUserResult}
            userResult={userResult}
          />
        </div>
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
