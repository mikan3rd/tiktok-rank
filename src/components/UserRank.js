import React from 'react';

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
                    <img src={user.avatar_thumb} role="presentation" />
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
                  </div>
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