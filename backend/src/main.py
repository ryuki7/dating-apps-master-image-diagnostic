from flask import Flask, request
from flask_cors import CORS
from cutting_image import get_cutting_image_data
from diagnostic_result import get_diagnostic_result

# appという名前でFlaskのインスタンスを作成。
app = Flask(__name__)
# 日本語
app.config["JSON_AS_ASCII"] = False
CORS(app)

@app.route('/', methods=["POST"])
def diagnostic_image():
    # 送られてきたparamsデータをjsonで取得する
    params_json = request.get_json()
    ## 画像のbase64データを取得する
    # base64 => 「/9j/」から始まる文字列で表現されている
    image_base64 = params_json['image_base64'].split(',')[1]
    cutting_image_data = get_cutting_image_data(image_base64, params_json['image_kind'], params_json['image_inclination'])
    # 画像データが格納されている場合 => True, 画像データが格納されていない場合 => False
    if cutting_image_data.any():
        diagnostic_result = get_diagnostic_result([cutting_image_data])
        print('clear')
        return str(diagnostic_result[0][1])
    else:
        return '診断できませんでした'

if __name__ == '__main__':
    # 作成したappを起動してくれる。
    app.run(host="0.0.0.0")

    # FLASK_APP=main.py FLASK_ENV=development flask run でも起動できる。
    # 上記のコードの場合、テンプレートが変更されると自動的にサーバーを再起動してくれる。
