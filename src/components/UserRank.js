import React from 'react';

import LazyImg from './Shared/LazyImg'

class UserRank extends React.Component {

  componentWillMount() {
    this.props.getUserResult({page: 1});
  }

  render() {

    const {
      user_list,
      paging,
    } = this.props.userResult;

    console.log(user_list)

    return (
      <div className="c-user-rank">
        <div className="c-user-rank__list">
          {user_list && user_list.map((user, index) => {
            return (
              <a
                key={index}
                className="c-user-rank__user__wrapper"
                href={user.share_url}
                target="_blank"
              >
                <div className="c-user-rank__user">

                  <div className="c-user-rank__user__left">
                    <img src={user.avatar_thumb} role="presentation" alt={user.nickname} />
                  </div>

                  <div className="c-user-rank__user__center">
                    <div className="c-user-rank__user__center__name">
                      <div className="c-user-rank__user__center__name__nickname">
                        {user.nickname}
                      </div>
                      {user.custom_verify &&
                      <div className="c-user-rank__user__center__name__label">
                        {user.custom_verify}
                      </div>
                      }
                    </div>
                    {user.signature &&
                    <p className="c-user-rank__user__center__signature">{user.signature}</p>
                    }
                    {user.twitter_name &&
                    <div>
                      <div className="c-user-rank__user__center__twitter__wrapper">
                      <a
                        className="c-user-rank__user__center__twitter"
                        href={`https://twitter.com/${user.twitter_name}`}
                        target="_blank"
                      >
                        <img src="./images/icon_twitter.png" role="presentation"/>
                        <div>@{user.twitter_name}</div>
                      </a>
                      </div>
                    </div>
                    }
                    {user.ins_id &&
                    <div>
                      <div className="c-user-rank__user__center__twitter__wrapper">
                      <a
                        className="c-user-rank__user__center__instagram"
                        href={`https://www.instagram.com/${user.ins_id}/`}
                        target="_blank"
                      >
                        <img src="./images/icon_instagram.jpg" role="presentation"/>
                        <div>@{user.ins_id}</div>
                      </a>
                      </div>
                    </div>
                    }

                    {user.youtube_channel_id && user.youtube_channel_title &&
                    <div>
                      <div className="c-user-rank__user__center__twitter__wrapper">
                      <a
                        className="c-user-rank__user__center__youtube"
                        href={`https://www.youtube.com/channel/${user.youtube_channel_id}`}
                        target="_blank"
                      >
                        <img src="./images/icon_youtube.png" role="presentation"/>
                        <div>{user.youtube_channel_title}</div>
                      </a>
                      </div>
                    </div>
                    }

                  </div>

                  {/* <div className="c-user-rank__user__right">

                  </div> */}

                  <div className="c-user-rank__user__number">{user.index + 1}</div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    )
  }
}


export default UserRank;