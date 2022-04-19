import React, { useState, useEffect, useRef } from 'react';
import Resizer from "react-image-file-resizer";
import axios from 'axios';

function ImageForm(props) {
  const labelText = useRef('写真を選択');
  const moveButtonElementCheck = useRef(true);
  const [preview, setPreview] = useState();
  const [image, setImage] = useState();

  // 画像ファイルをリサイズする。(画像ファイルを返す。)
  const resizeFile = (image_file, size, output_type) =>
    new Promise((resolve) => {
        Resizer.imageFileResizer(
        image_file,
        size,
        size,
        // どの拡張子に圧縮するのかを指定。(下記の場合、「JPEG」に変換する。)
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        // どのデータタイプに変換するのかを指定。(下記の場合、「file」に変換する。)
        output_type
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

    // 最下部にスクロールを移動させる。
    const scrollBottom = () => {
        const element = document.documentElement;
        const bottom = element.scrollHeight - element.clientHeight;
        window.scroll(0, bottom);
    }

    // 第二引数に「props.radio_value_array」を指定しても、なぜかレンダリング毎に実行される為、わざと第二引数を指定しない。(第二引数を指定しない時の挙動 => レンダリング毎に第１引数の関数を実行。)
    useEffect(() => {
      // 「全部(2つ)のラジオボタンが選択されている」「写真(プレビュー)が選択されている」「submitボタンが表示されていない」の3つの条件が揃っている時に動作する。
      if (!(props.radio_value_array === undefined) && !(preview === undefined) && moveButtonElementCheck.current) {
        // console.log('clear')
        moveButtonElement();
        scrollBottom();
      }
    });

  // 写真が選択(変更)されると動作する関数
  const handleChangeFile = async (event) => {
    try {
      const image_file = event.target.files[0];
      const preview_image_file = await resizeFile(image_file, 150, 'file');
      labelText.current = '写真を変更'
    //   斜辺サイズの枠の中央に配置する画像となり、回転させる為、300x300にリサイズして送る。
      setImage(await resizeFile(image_file, 300, 'base64'))
      setPreview(window.URL.createObjectURL(preview_image_file));
    } catch (err) {
      console.log(err);
    }
  };

  console.log('test')

  const handleSubmit = () => {
      const params = {
        image_base64: image,
        image_kind: props.radio_value_array[0],
        image_inclination: props.radio_value_array[1]
      }

      props.get_result_check('「診断中・・・」に切り替え')
      axios.post(process.env.REACT_APP_SERVER_URL, params,)
      .then(response => {
        const loader_element = document.getElementById('loader');
        const diagnostic_result_element = document.getElementById('diagnostic_result');
        console.log(response)
        console.log(response.data);
        props.get_result_check(response.data)
        loader_element.classList.add("hidden");
        diagnostic_result_element.classList.remove("hidden");
      })
      .catch(() => {
        console.log('通信に失敗しました');
        props.get_result_check('通信に失敗しました')
        console.log(params)
      });
  }

  return (
    <div className='image_form'>
      <img src={ preview } alt='' />
      <label htmlFor='image_input'>{ labelText.current }</label>
      <input
        type="file"
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