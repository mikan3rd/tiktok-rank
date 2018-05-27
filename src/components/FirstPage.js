import React from 'react';
import {Page, Icon, AlertDialog, AlertDialogButton, Modal} from 'react-onsenui';

class FirstPage extends React.Component {

    constructor(props){
      super(props)
      this.state = {
        isAlertOpen: false,
        alertMessage: '',
      }
    }

    getCurrentPosition = () => {
      if (!navigator.geolocation) {
        this.setState({
            isAlertOpen: true,
            alertMessage: 'この端末では\n現在地を取得できません'
        })
        return;
      }

      this.props.changeValueForKey({key: 'message', value: '現在地を取得中...'});
      this.props.changeValueForKey({key: 'isLoading', value: true});

      navigator.geolocation.getCurrentPosition(
        this.successGetCurrentPosition,
        this.failedGetCurrentPosition,
      );

    }

    successGetCurrentPosition = (position) => {
      const {
        latitude,
        longitude,
      } = position.coords;

      let params = this.props.index.params;
      params = params.set('latitude', latitude);
      params = params.set('longitude', longitude)

      this.props.changeValueForKey({key: 'params', value: params})
      this.props.getSearchResult({params: params.toJS(), navigator: this.props.navigator});
    }

    failedGetCurrentPosition = (error) => {
      this.props.changeValueForKey({key: 'isLoading', value: false});
	  var errorMessage = {
		0: "原因不明のエラーが\n発生しました" ,
        1: "位置情報の取得が\n許可されませんでした\n\n位置情報の取得を\n許可してください" ,
		2: "電波状況などで\n位置情報が取得できませんでした" ,
		3: "位置情報の取得に\n時間がかかり過ぎて\n失敗しました" ,
	  };
      this.setState({
        isAlertOpen: true,
        alertMessage: errorMessage[error.code]
      })
    }

  render () {
    const {
      isAlertOpen,
      alertMessage
    } = this.state;

    const {
      index,
    } = this.props;

    const {
      isLoading,
      message,
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
        <AlertDialog
          isOpen={isAlertOpen}
          isCancelable={false}
        >
          <div className="c-first-page__alert">
            <div>エラーが発生しました</div>
            {alertMessage}
          </div>
          <AlertDialogButton onClick={() => this.setState({isAlertOpen: false})}>
            OK
          </AlertDialogButton>
        </AlertDialog>
        <div className="c-first-page">
          <div className="c-first-page__logo">
            <img src="./images/logo.jpg" role="presentation" />
          </div>
          <div className="c-first-page__description">
            Ottimo!!（オッティモ!!）は<br />
            近くの飲食店を<br />
            簡単に検索できるサービスです。
          </div>
          <div
            className="c-first-page__search"
            onClick={() => this.getCurrentPosition()}
          >
            <Icon
                icon="md-search"
                size={30}
            />
            <div>
              現在地から検索する
            </div>
          </div>
        </div>
      </Page>
    );
  }
}

export default FirstPage;