import React from 'react';
import {Icon} from 'react-onsenui';
import Select from "react-select";

import LazyImg from './Shared/LazyImg';
import Paginator from './Shared/Paging';


const sortOptions = [
  {value: 'total_favorited', label: 'ハートが多い順'},
  {value: 'follower_count', label: 'ファンが多い順'},
  {value: 'aweme_count', label: '動画が多い順'},
]

const genderOptions = [
  {value: '1', label: '男'},
  {value: '2', label: '女'},
  {value: '0', label: 'その他'},
]

const accountOptions = [
  {value: '人気クリエイター', label: '人気クリエイター'},
  {value: '認証済みアカウント', label: '認証済みアカウント'},
  {value: 'バッジなし', label: 'バッジなし'},
  // {value: 'ハロウィン仮装キング', label: 'ハロウィン仮装キング'},
  // {value: 'ハロウィン仮装クイーン', label: 'ハロウィン仮装クイーン'},
  // {value: '公式アカウント', label: '公式アカウント'},
]


const groupedOptions = [
  {
    label: "性別",
    options: genderOptions,
  },
  {
    label: "バッジ",
    options: accountOptions,
  }
];

class UserRank extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      sort: sortOptions[0],
      options: [],
    }
  }

  componentWillMount() {
    this.getUserResult();
  }

  getUserResult = () => {
    const {page, sort, gender, options} = this.state;

    this.props.getUserResult({
      page,
      sort: sort.value,
      options: options.map(g => g.value),
    });
  }

  changeParams = ({key, value}) => {
    this.setState({page: 1, [key]: value}, () => this.getUserResult());
  }

  render() {

    const {
      sort,
      options,
    } = this.state;

    const {
      user_list,
      paging,
    } = this.props.userResult;

    // console.log(this.state)
    // console.log(user_list)

    return (
      <div className="c-user-rank">

        <div className="react-select__wrapper">
        <Select
          className="react-select"
          value={sort}
          isClearable={false}
          options={sortOptions}
          onChange={(option) => this.changeParams({key: 'sort', value: option})}
        />
        </div>

        <div className="react-select__wrapper">
        <Select
          className="react-select__multi"
          value={options}
          isClearable={true}
          options={groupedOptions}
          onChange={(option) => this.changeParams({key: 'options', value: option})}
          isMulti
          placeholder="指定なし"
        />
        </div>

        {paging &&
        <Paginator
          paging={paging}
          changeParams={this.changeParams}
        />
        }

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

                    <div className="c-user-rank__user__left__stats">

                      {sort.value === 'total_favorited' &&
                        <Icon
                        icon="ion-heart"
                        size={20}
                        style={{color: 'red', marginRight: '4px'}}
                      />
                      }

                      {sort.value === 'follower_count' &&
                        <Icon
                        icon="md-face"
                        size={20}
                        style={{color: '#fff', marginRight: '4px'}}
                      />
                      }

                      {sort.value === 'aweme_count' &&
                        <Icon
                        icon="md-videocam"
                        size={20}
                        style={{color: '#fff', marginRight: '4px'}}
                      />
                      }

                      <div className="c-user-rank__user__left__stats__num">
                        {Number(user[sort.value]).toLocaleString()}
                      </div>
                    </div>

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

                  <div className="c-user-rank__user__number">{user.index + 1}</div>
                </div>
              </a>
            );
          })}
        </div>

        {paging &&
        <Paginator
          paging={paging}
          changeParams={this.changeParams}
        />
        }

      </div>
    )
  }
}


export default UserRank;