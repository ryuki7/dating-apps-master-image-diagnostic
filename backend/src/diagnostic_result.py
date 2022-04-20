import pickle
# 数値計算ライブラリ
import numpy as np
from decimal import Decimal, ROUND_HALF_UP

# 学習済みモデルを利用して結果を取得する関数
# リスト(配列)を渡しているが、実際に含まれている画像データは1枚だけ。(配列にしないと推論ができない為。)
def get_diagnostic_result(cutting_image_data_list, kind):
    # typeを「npのarray(numpy.ndarray)」型に変換する。(tensorflowが受け付ける型にする。)
    cutting_image_data_list = np.array(cutting_image_data_list)
    # 255で割ることで正規化する。(RGBの数値を0〜1の範囲内に収めるようにする。色は0から255までの値を使って表現している為。)
    cutting_image_data_list = cutting_image_data_list / 255

    origin_model_file_path = './{}.xml'
    model_file_path = origin_model_file_path.format(select_model_file_path(kind))
    # 保存してある学習済みモデルをロードする
    loaded_model = pickle.load(open(model_file_path, 'rb'))
    ## 結果を取得する(推論)
    # print(np.argmax(loaded_model.predict(cutting_image_data_list), axis=1))
    result_nd_array = loaded_model.predict(cutting_image_data_list)[0] # 例) => [0.005658 0.994342]
    rounding_decimal_value = Decimal(str(result_nd_array[1] * 100))
    # 四捨五入する。(0を指定した場合 => 少数第一位の値を四捨五入する。)
    before_adjustment_result = int(rounding_decimal_value.quantize(Decimal('0'), rounding=ROUND_HALF_UP))
    return after_adjustment_result(before_adjustment_result, kind)

def select_model_file_path(kind):
    model_file_dict = {
      '顔（マスク無し）': 'face_model',
      '顔（マスク有り or 半顔）': 'face_masuku_model',
      '雰囲気（スタイル）': 'vibe_model'
    }

    return model_file_dict[kind]

def after_adjustment_result(before_adjustment_result, kind):
    kind_dict = {
      '顔（マスク無し）': 0,
      '顔（マスク有り or 半顔）': 5,
      '雰囲気（スタイル）': 5
    }

    diagnostic_result = before_adjustment_result - kind_dict[kind]
    # 結果が「0%」未満の場合、0を代入する。
    if diagnostic_result < 0:
        diagnostic_result = 0

    return str(diagnostic_result)
