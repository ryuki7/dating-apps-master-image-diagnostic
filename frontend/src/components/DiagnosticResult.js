import React from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import SnsShere from './SnsShere';

function DiagnosticResult(props) {
    return (
      <>
        <Loading />
        {/* // height => 画面上下(「URL入力ボックス」・「戻るボタン」)のことを考慮して、1.2倍にする。 */}
        <div className="bgImage diagnostic_result hidden" id='diagnostic_result' style={{height: window.innerHeight * 1.2}}>
          <p className='each_title gradation result'>診断結果</p>
          <div className='box'>
            <div className="box_title">モテ度</div>
            <div className="box_element">
              <p className='result_text'>{ props.get_result_data }</p>
              {/* レスポンスが○％を返した場合 */}
              { props.get_result_data.match(/％/) && (
                <>
                  <p className='shere_text'>診断結果を友達にシェアする</p>
                  <SnsShere
                    title_text={ 'モテ度: ' + props.get_result_data }
                  />
                </>
              )}
            </div>
          </div>
          <Link to='/diagnostic_redirect' className='button result'>診断画面へ</Link>
        </div>
      </>
    )
}

export default DiagnosticResult;