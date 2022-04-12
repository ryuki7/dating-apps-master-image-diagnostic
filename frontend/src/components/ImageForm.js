import React, { useState, useEffect, useRef } from 'react';
import Resizer from "react-image-file-resizer";
import axios from 'axios';

function ImageForm(props) {
  const labelText = useRef('写真を選択');
  const moveButtonElementCheck = useRef(true);
  const [preview, setPreview] = useState();
  const [image, setImage] = useState();

  // 画像ファイルをリサイズする。(画像ファイルを返す。)
  const resizeFile = (image_file) =>
    new Promise((resolve) => {
        Resizer.imageFileResizer(
        image_file,
        150,
        150,
        // どの拡張子に圧縮するのかを指定。(下記の場合、「JPEG」に変換する。)
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        // どのデータタイプに変換するのかを指定。(下記の場合、「file」に変換する。)
        "file"
        );
    });

    // 診断画面 submitボタンの要素の位置を移動させ、表示(hiddenクラスを削除する)させる。
    const moveButtonElement = () => {
      const diagnostic_element = document.getElementById('diagnostic');
      const submit_button_element = document.getElementById('diagnostic_submit_button');
      diagnostic_element.appendChild(submit_button_element)
      submit_button_element.classList.remove("hidden");
      moveButtonElementCheck.current = false;
    }

    // 第二引数に「props.radio_value_array」を指定しても、なぜかレンダリング毎に実行される為、わざと第二引数を指定しない。(第二引数を指定しない時の挙動 => レンダリング毎に第１引数の関数を実行。)
    useEffect(() => {
      // 「全部(2つ)のラジオボタンが選択されている」「写真(プレビュー)が選択されている」「submitボタンが表示されていない」の3つの条件が揃っている時に動作する。
      if (!(props.radio_value_array === undefined) && !(preview === undefined) && moveButtonElementCheck.current) {
        // console.log('clear')
        moveButtonElement();
      }
    });

  // 写真が選択(変更)されると動作する関数
  const handleChangeFile = async (event) => {
    try {
      const image_file = event.target.files[0];
      const resize_image_file = await resizeFile(image_file);
      labelText.current = '写真を変更'
      setImage(resize_image_file)
      setPreview(window.URL.createObjectURL(resize_image_file));
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = () => {
      const params = {
        file: image,
        kind: props.radio_value_array[0],
        inclination: props.radio_value_array[1]
      }

      axios.post(process.env.REACT_APP_SERVER_URL, params,
      {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then(response => {
        console.log(response);
        props.get_result_check(response)
      })
      .catch(() => {
        console.log('通信に失敗しました');
        props.get_result_check('テスト')
        console.log(params)
      });
  }

  return (
    <div className='image_form'>
      <img src={ preview } alt='' />
      <label htmlFor='image_input'>{ labelText.current }</label>
      <input
        multiple type="file"
        id='image_input'
        name="photo"
        accept="image/*"
        onChange={ event => handleChangeFile(event) }
      />
      <button className='button hidden' onClick={ () => handleSubmit() } id='diagnostic_submit_button'>診断</button>
    </div>
  )
}

export default ImageForm;