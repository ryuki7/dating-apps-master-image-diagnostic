import React, { useState, useRef } from 'react';
import RadioButton from './RadioButton';
import ImageForm from './ImageForm';
import DiagnosticResult from './DiagnosticResult';

function Diagnostic() {
    const radioValueKind = useRef()
    const radioValueInclination = useRef()
    const [radioValueArray, setRadioValueArray] = useState();
    // 診断結果のデータを取得()
    const [getResult, setGetResult] = useState();
    // console.log(getResult)
    const label_text_kind_array = ['顔（マスク無し）', '顔（マスク有り or 半顔）', '雰囲気（スタイル）.※ 必ず上半身は全部写っていること。全身でなくても可。'];
    const label_text_inclination_array = ['無し', '左', '右'];

    // getResultステートを更新する。
    const getResultCheck = (result_data) => {
      setGetResult(result_data)
    }

    var count = 0;
    const get_start_index = (array_2d) => {
        if (array_2d === null) {
            return 0
        }
        for (let array of array_2d) {
            if (array_2d.length === '1') {
                return Number(array.length)
            }
            count += Number(array.length);
        };
        return count
    }

    const onChangeValue = (event, name) => {
      if (name === 'kind' ) {
        radioValueKind.current = event.target.value
        // console.log(radioValueKind.current)
      }
      else if (name === 'inclination') {
        radioValueInclination.current = event.target.value
        // console.log(radioValueInclination.current)
      }

    //   二つのラジオのボタンが選択されていれば、Stateを更新して、再レンダリングさせる。(ImageFormコンポーネントに新しいpropsを渡したい。)
      if (!(radioValueKind.current === undefined) && !(radioValueInclination.current === undefined)) {
        setRadioValueArray([radioValueKind.current, radioValueInclination.current])
      }
    }

    return (
      <React.Fragment>
        { getResult === undefined && (
          <div className='diagnostic' id='diagnostic'>
            <p className='each_title gradation'>診断画面</p>   
            <ImageForm
              get_result_check={ (result_data) => getResultCheck(result_data) }
              radio_value_array={ radioValueArray }
            />
            <p className='attention_text'>※ 選択した写真についての情報を正しく選択しないと、正しい診断結果を得られませんので、正しい情報を選択して下さい。<br></br>※ 写真によっては、正しい情報を選択していても、正しい診断結果を得られない時があります。ご了承ください。</p>
            <div className='select_item'>
                <p className='two_vertical_line hot_pink'>写真の種類</p>
                <div className="cp_ipradio hot_pink">
                <div onChange={ event => onChangeValue(event, 'kind') }>
                  <RadioButton
                    start_index={ get_start_index(null) }
                    label_text_array={ label_text_kind_array }
                    name='kind'
                  />
                </div>
                </div>
            </div>
            <div className='select_item'>
                <p className='two_vertical_line yellow_green'>写真の傾き</p>
                <div className="cp_ipradio yellow_green">
                <div onChange={ event => onChangeValue(event, 'inclination') }>
                  <RadioButton
                    start_index={ get_start_index([label_text_kind_array]) }
                    label_text_array={ label_text_inclination_array }
                    name='inclination'
                  />
                </div>
                </div>
            </div>
          </div>
        )}
        { getResult && (
          <DiagnosticResult
            get_result_data={ getResult }
          />
        )}
      </React.Fragment>
        
    )
}

export default Diagnostic;