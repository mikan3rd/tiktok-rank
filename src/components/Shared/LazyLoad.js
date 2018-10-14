import React from 'react';
import PropTypes from 'prop-types';
import {default as ReactLazyLoad} from 'react-lazyload';

/**
 * LazyLoad (react-lazyloadラッパー)
 *
 * react-lazyload: https://github.com/jasonslyvia/react-lazyload
 *
 * 共通設定をdefaultPropsとして再定義している。
 * また、react-lazyloadはplaceholderとしてコンポーネントを受け付けるが、
 * 追加でplaceholderClassNameを定義し、placeholderとして指定されたクラス名の
 * 空div要素を適用するように調整している。
 */
export default class LazyLoad extends React.Component {
  static propTypes = {
    placeholderClassName: PropTypes.string,
    offset: PropTypes.number,
  };

  static get defaultProps() {
    return {
      offset: 200,
      once: true,
    };
  }

  render() {
    const {placeholderClassName} = this.props;

    const props = Object.assign({}, this.props);
    if (placeholderClassName != null && this.props.placeholder == null) {
      props.placeholder = <div className={placeholderClassName} />;
    }
    return <ReactLazyLoad {...props} />;
  }
}
