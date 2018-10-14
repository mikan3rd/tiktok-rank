import React from 'react';
import {default as ReactImg} from 'react-image';

const NO_IMAGE_ELEMENT_STYLE = {style: {backgroundColor: '#bcbec0', objectFit: 'cover'}};

/**
 * Img (react-imageラッパー)
 *
 * react-image: https://github.com/mbrevda/react-image
 *
 * react-imageはloader, unloaderを指定しないと問答無用でnullを返すため、
 * nullではなく空img要素を返すようにしたラッパー。
 *
 * react-imageの詳細についてはgithubを参照。
 */
export default class Img extends React.Component {
  render() {
    const {className} = this.props;
    const loaderProps = {};
    if (className != null) {
      loaderProps.className = className;
    }

    // デフォルトloader
    // (画像ロード中に表示されるコンポーネント、指定しないとreact-imageはnullを返す)
    const loader = <img src={'empty.png'} role="presentation" {...loaderProps} />;

    // デフォルトunloader
    // (画像が取得できなかった場合に表示されるコンポーネント、指定しないとreact-imageはnullを返す)
    const unloaderProps = {...loaderProps, ...NO_IMAGE_ELEMENT_STYLE};
    const unloader = <img src={'noimage.png'} role="presentation" {...unloaderProps} />;

    const props = {loader, unloader, ...this.props};

    return <ReactImg {...props} />;
  }
}
