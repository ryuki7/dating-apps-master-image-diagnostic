import React from 'react';

function DiagnosticResult(props) {
    return (
      <>
        <h2>DiagnosticResult</h2>
        <h3>{ props.get_result_data }</h3>
      </>
    )
}

export default DiagnosticResult;