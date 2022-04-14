import React from 'react';
import { Link } from 'react-router-dom';

function DiagnosticResult(props) {
    return (
      <div className="bgImage diagnostic_result" style={{height: window.innerHeight}}>
        <p className='each_title gradation'>診断結果</p>   
        <h3>{ props.get_result_data }</h3>
        <Link to='/diagnostic_redirect' className='button top'>診断画面へ</Link>
      </div>
    )
}

export default DiagnosticResult;