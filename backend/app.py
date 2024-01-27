from flask import Flask, request, jsonify
from subprocess import run, PIPE
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt

app = Flask(__name__)
CORS(app)
app.config['JWT_SECRET_KEY'] = 'hbabhsb1y2e838dh37d38hfh2sjgnf8e837181bed8h38929'
jwt = JWTManager(app)
bcrypt = Bcrypt(app)

users = {
    'admin': {
        'password': bcrypt.generate_password_hash('admin123'),
        'role': 'admin'
    },
    'user': {
        'password': bcrypt.generate_password_hash('user123'),
        'role': 'user'
    }
}

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = users.get(username)

    if user and bcrypt.check_password_hash(user['password'], password):
        access_token = create_access_token(identity={'username': username, 'role': user['role']})
        return jsonify(access_token=access_token)

    return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/api/chat', methods=['POST'])
@jwt_required()
def handle_chat():
    try:
        data = request.get_json()

        if 'message' not in data:
            return jsonify({'error': 'Message field missing'}), 400

        command = data['message']
        result = execute_python_command(command)

        return jsonify({'message': result})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True)
