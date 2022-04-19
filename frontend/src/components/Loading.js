import React from 'react';
import './loading.css'

function Loading() {
    return (
      <div className="loader" id="loader">
        <div className="txt">
          診断中・・・
        </div>
        <div className="spin a">
        </div>
        <div className="spin b">
        </div>
      </div>
    )
}

export default Loading;