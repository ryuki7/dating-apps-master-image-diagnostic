import React from 'react';
import { Link } from 'react-router-dom';

function Top() {
    return (
      <div className="bgImage" style={{height: window.innerHeight}}>
        <div className='title'>
          <p className='sub'>マッチングアプリ</p>
          <p className='main'>プロフィール写真<br></br>診断</p>
        </div>
        <p className='description'>あなたの写真をマッチングアプリのプロフィール写真に設定した場合、どれくらいモテるのかを診断してくれるサービスです。</p>
        <Link to='/diagnostic' className='button top'>診断する</Link>
      </div>
    );
};

export default Top;