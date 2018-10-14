import React from 'react';
import PropTypes from 'prop-types';
import Img from './Img';
import LazyLoad from './LazyLoad';


/**
 * LazyImg (LazyLoad + Imgラッパー)
 *
 * 画像を遅延読み込みしつつ、画像が存在しない場合(404 Not Found)の場合は、
 * 代替するコンポーネントを表示するコンポーネント
 *
 * ただし、srcの指定が文字列かつ'/'から始まる(内部アセット)の場合は、単純なimg要素を返す。
 *
 * LazyLoad, Imgコンポーネントについては、各コンポーネント参照。
 */
export default class LazyImg extends React.Component {
  static propTypes = {
    placeholderClassName: PropTypes.string,
    offset: PropTypes.number,
  };

  render() {
    const {placeholderClassName, offset, ...props} = this.props;

    if ((typeof props.src) === 'string' && props.src.indexOf('/', 0) === 0) {
      // srcの指定が文字列かつ'/'から始まる(内部アセット)の場合
      // eslintがwarning出すので、alt, roleは取り出して個別にimg要素に指定する
      const {alt, role, ...rest} = props;
      return <img alt={alt} role={role} {...rest} />;
    }
    return (
      // srcが内部アセットでない場合、LazyLoadしつつ、404対応も行う。
      <LazyLoad
        placeholderClassName={placeholderClassName}
        offset={offset}
      >
        <Img {...props} />
      </LazyLoad>
    );
  }
}
