import pickle
# 数値計算ライブラリ
import numpy as np

# 学習済みモデルを利用して結果を取得する関数
# リスト(配列)を渡しているが、実際に含まれている画像データは1枚だけ。(配列にしないと推論ができない為。)
def get_diagnostic_result(cutting_image_data_list):
    # typeを「npのarray(numpy.ndarray)」型に変換する。(tensorflowが受け付ける型にする。)
    cutting_image_data_list = np.array(cutting_image_data_list)
    # 255で割ることで正規化する。(RGBの数値を0〜1の範囲内に収めるようにする。色は0から255までの値を使って表現している為。)
    cutting_image_data_list = cutting_image_data_list / 255

    file_path = './face_model.xml'
    # 保存してある学習済みモデルをロードする
    loaded_model = pickle.load(open(file_path, 'rb'))
    # 結果を取得する(推論)
    print(np.argmax(loaded_model.predict(cutting_image_data_list), axis=1))
    return loaded_model.predict(cutting_image_data_list)
