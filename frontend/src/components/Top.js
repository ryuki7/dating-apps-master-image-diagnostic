import React from 'react';
import { Link } from 'react-router-dom';
import SnsShere from './SnsShere';

function Top() {
    return (
      <div className="bgImage top" style={{height: window.innerHeight}}>
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
        <Link to='/terms' className='button terms_privacy terms'>利用規約</Link>
        <Link to='/privacy' className='button terms_privacy privacy'>プライバシーポリシー</Link>
      </div>
    );
};

export default Top;