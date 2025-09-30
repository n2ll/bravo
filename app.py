import os
from flask import Flask, request, jsonify, render_template
import requests

app = Flask(__name__, template_folder="templates")  # templates 폴더 지정

# 테스트용 하드코딩 값 (운영 시 .env로 관리 권장)
PAYPLE_CST_ID = "test"
PAYPLE_CUST_KEY = "abcd1234567890"

# 👉 결제 페이지 라우트 (pay.html 띄우기)
@app.route("/")
def index():
    return render_template("pay.html")


# 👉 인증 결과 수신 → 승인 API 호출
@app.route("/pay/result", methods=["POST"])
def pay_result():
    data = request.form.to_dict() or {}
    print("[pay_result] 받은 데이터:", data)

    auth_key = data.get("PCD_AUTH_KEY")
    pay_reqkey = data.get("PCD_PAY_REQKEY")

    if not auth_key or not pay_reqkey:
        return jsonify({"error": "필수 키 누락", "data": data}), 400

    payload = {
        "PCD_CST_ID": PAYPLE_CST_ID,
        "PCD_CUST_KEY": PAYPLE_CUST_KEY,
        "PCD_AUTH_KEY": auth_key,
        "PCD_PAY_REQKEY": pay_reqkey
    }

    try:
        resp = requests.post(
            "https://demo-api-v2.payple.kr/api/v1/payments/cards/approval/confirm",
            headers={
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
                "Referer": "http://localhost:5000"
            },
            json=payload,
            timeout=10
        )
        resp.raise_for_status()
        confirm = resp.json()
        print("[pay_result] 승인 응답:", confirm)
    except Exception as e:
        return jsonify({"error": "승인 API 실패", "detail": str(e)}), 500

    return jsonify({"msg": "결제 승인 완료", "confirm": confirm})


if __name__ == "__main__":
    app.run(port=5000, debug=True)
