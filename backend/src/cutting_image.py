## インストールしたパッケージのインポート
# 数値計算ライブラリ
import numpy as np
# 画像処理ライブラリ
import cv2
# 数学的な計算をするのに役立つ標準モジュール
import math
import base64
import uuid
import os

# 画像を切り取る処理を行う関数
def get_cutting_image_data(image_base64, kind, inclination):
    # カスケード型識別器の読み込み(種類別)
    cascade = select_cascade(kind)
    # detectMultiScaleのオプションを返す(種類別)
    minNeighbors, minSize = detectMultiScale_option(kind)

    # 赤色(Red)
    red = (0, 0, 255)

    # 「base64」を「binary」に変換する
    img_binary = base64.b64decode(image_base64)
    # 「bytesクラス(binary)」を「numpy.ndarrayクラス」に変換する
    img_np = np.frombuffer(img_binary, dtype=np.uint8)
    # 「画像データ(3次元配列)」に変換する
    image_data = cv2.imdecode(img_np, cv2.IMREAD_ANYCOLOR)
    rows, cols, colors = image_data.shape
    # グレースケール変換
    image_data_gray = cv2.cvtColor(image_data, cv2.COLOR_RGB2GRAY)
      
    # 元画像の斜辺サイズの枠を作る(0で初期化)
    hypot = int(math.hypot(rows, cols))
    frame = np.zeros((hypot, hypot), np.uint8)
    frame[math.floor((hypot - rows) * 0.5):math.floor((hypot + rows) * 0.5), math.floor((hypot - cols) * 0.5):math.floor((hypot + cols) * 0.5)] = image_data_gray

    # for文でループさせて、違う角度で回転させた結果のものに対して検出を試みる
    # 右回転(時計回り) => clock_wise = range(0, 46, 5)
    # 左回転(反時計回り) => counter_clock_wise = range(0, -46, -5)
    file_name = None
    for deg in direction_of_rotation(inclination):
      M = cv2.getRotationMatrix2D((hypot * 0.5, hypot * 0.5), -deg, 1.0)
      # rotated変数 => 「斜辺サイズの枠の中央に元画像を配置した画像」が格納される。
      rotated = cv2.warpAffine(frame, M, (hypot, hypot))
      # 顔領域の探索(顔認識)。座標(x, y, w, h)を取得する。
      face_data_list = cascade.detectMultiScale(rotated, scaleFactor = 1.05, minNeighbors = minNeighbors, minSize = minSize)
      # 顔領域を赤色の矩形で囲む(x, y, w, hの「顔の座標」を利用する為に、for文を使用している、)
      for (x, y, w, h) in face_data_list:
        increment_wide, increment_height = math.floor(w * 1.05), math.floor(h * 1.2)
        start_x, end_x = x - (increment_wide - w), x + increment_wide
        start_y, end_y = y - (increment_height - h), y + increment_height

        # 始まりの座標(xとy)がマイナスにならないようにする。
        if start_x <= 0:
          start_x = 0
        elif start_y <= 0:
          start_y = 0

        # 始まりの点 => (x - 30, y), 終わりの点 => (x + w + 30, y + h)
        cv2.rectangle(rotated, (start_x, start_y), (end_x, end_y), red, thickness=2)
        # 切り取り
        cutting_image_data = rotated[start_y:end_y, start_x:end_x]
        ## 保存
        # 一意の名前を取得する為に、uuidを使用
        file_name = str(uuid.uuid1()) + '.JPEG'
        cv2.imwrite(file_name, cutting_image_data)
        break
      else:
        continue
      break

    # 画像を切り取れなかった(検出できなかった)場合
    if file_name == None:
        return np.array([False])

    available_cutting_image_data = cv2.imread(file_name)
    # 画像のリサイズ
    available_cutting_image_data = cv2.resize(available_cutting_image_data , select_image_resize(kind))
    # 画像ファイルがどんどん増えていってしまう為、利用したら画像ファイルを消す。
    os.remove(file_name)
    return available_cutting_image_data

def select_cascade(kind):
    cascade_dict = {
      '顔（マスク無し）': 'haarcascade_frontalface_alt',
      '顔（マスク有り or 半顔）': 'haarcascade_frontalface_default',
      '雰囲気（スタイル）': 'haarcascade_upperbody'
    }

    cascade_path = './opencv/haarcascades/{}.xml'
    cascade = cv2.CascadeClassifier(cascade_path.format(cascade_dict[kind]))
    return cascade

def detectMultiScale_option(kind):
    option_dict = {
      '顔（マスク無し）': (4, (65, 65)),
      '顔（マスク有り or 半顔）': (1, (70, 95)),
      '雰囲気（スタイル）': (1, (70, 95))
    }

    return option_dict[kind]

# 回転方向を決める(傾きによって変わる)
def direction_of_rotation(inclination):
    inclination_and_rotation_dict = {
      '無し': range(0, 46, 5),
      '左': range(0, 46, 5),
      '右': range(0, -46, -5)
    }

    return inclination_and_rotation_dict[inclination]

def select_image_resize(kind):
    resize_dict = {
      '顔（マスク無し）':(120, 120),
      '顔（マスク有り or 半顔）': (120, 120),
      '雰囲気（スタイル）': (200, 200)
    }

    return resize_dict[kind]
