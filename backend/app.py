from flask import Flask, request, jsonify
from flask_cors import CORS
from operations import compile_user_commands

app = Flask(__name__)
CORS(app)
    
@app.route('/api/chat/compile', methods=['POST'])
def handle_chat_compile():
    try:
        data = request.get_json()

        if 'uid' not in data or 'chatTitleId' not in data:
            return jsonify({'message': 'Message field missing'}), 400

        uid = data['uid']
        chatTitleId = data['chatTitleId']
        result = compile_user_commands(uid, chatTitleId)

        if result:
            return jsonify({'message': 'success'}), 200
        return jsonify({ 'message': 'failure'}), 500
    except Exception as e:
        return jsonify({'error': str(e), 'message': 'failure'}), 500

if __name__ == '__main__':
    app.run(debug=True)
