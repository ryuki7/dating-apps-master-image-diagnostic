import React from 'react';
import { 
    LineShareButton, 
    LineIcon,
    TwitterShareButton,
    TwitterIcon
  } from 'react-share';

function SnsShere(props) {
  const url = process.env.REACT_APP_APPLICATION_URL;
  const title = '『マッチングアプリ プロフィール写真診断』' + props.title_text;

    return (
      <div className='sns_shere'>
        <TwitterShareButton
          // シェア時に埋め込むURL
          url={ url }
          // 共有ページのタイトル
          title={ title }
          // シェア時に「@ryuki_programより」という文がツイート末尾に追加される
          via="ryuki_program"
          // ツイート投稿後にフォローを推奨するツイッターアカウントを指定する
          related={["ryuki_program"]}
          // シェア時にハッシュタグをツイート内に含めることができる
          hashtags={['マッチングアプリ', 'プロフィール写真', '診断']}
        >
          <TwitterIcon size={ 65 } round={ true } />
        </TwitterShareButton>

        <LineShareButton
          // シェア時に埋め込むURL
          url={ url }
          // 共有ページのタイトル
          title={ title }
        >
          <LineIcon size={ 65 } round={ true } />
        </LineShareButton>
      </div>
    )
}

export default SnsShere;