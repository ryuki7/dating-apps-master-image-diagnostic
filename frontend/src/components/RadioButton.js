import React from 'react';

function RadioButton(props) {
    const index_start = props.start_index
    const radio_button_list = props.label_text_array.map(function (text, index) {
        return (
          <React.Fragment key={ 'radio' + String(index_start + index) }>
            <input type="radio" value={ text.split('.')[0] } name={ props.name } id={ text.split('.')[0] } />
            <label htmlFor={ text.split('.')[0] }>{ text.split('.')[0] }</label>
            {/* 記載事項有り */}
            { text.split('.').length === 2 && (
              <span>{ text.split('.')[1] }</span>
            )}
            ここにイメージ画像を入れる。
          </React.Fragment>
        )
    }, index_start);

    return (
        <React.Fragment>
            { radio_button_list }
        </React.Fragment>
    )
}

export default RadioButton;