import React from 'react';
import { Link } from 'react-router-dom';
import SnsShere from './SnsShere';

function Top() {
    return (
      // height => 画面上下(「URL入力ボックス」・「戻るボタン」)のことを考慮して、1.3倍にする。
      <div className="bgImage top" style={{height: window.innerHeight * 1.3}}>
        <div className='title'>
          <p className='sub'>マッチングアプリ</p>
          <p className='main'>プロフィール写真<br></br>診断</p>
        </div>
        <p className='description'>あなたの写真をマッチングアプリのプロフィール写真に設定した場合、どれくらいモテるのかを診断してくれるサービスです。</p>
        <Link to='/diagnostic' className='button top'>診断する</Link>
        <p className='shere_text'>このサービスを友達にシェアする</p>
        <SnsShere
          title_text=''
        />
        <div className='terms_privacy'>
          <Link to='/terms' className='button'>利用規約</Link>
          <Link to='/privacy' className='button'>プライバシーポリシー</Link>
        </div>
      </div>
    );
};

export default Top;