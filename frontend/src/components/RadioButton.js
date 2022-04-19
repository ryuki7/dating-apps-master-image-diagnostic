import React from 'react';

function RadioButton(props) {
    const index_start = props.start_index;
    const radio_button_list = props.label_text_array.map(function (text, index) {
        return (
          <React.Fragment key={ 'radio' + String(index_start + index) }>
            <input type="radio" value={ text.split('.')[0] } name={ props.name } id={ text.split('.')[0] } />
            <label htmlFor={ text.split('.')[0] }>{ text.split('.')[0] }</label>
            <img src={ 'image/' + props.name + '/' + text.split('.')[0] + '.png' } alt={ text.split('.')[0] + 'のイメージ画像' } />
            {/* 記載事項有り */}
            { text.split('.').length === 2 && (
              <p className='kind_attention'>{ text.split('.')[1] }</p>
            )}
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