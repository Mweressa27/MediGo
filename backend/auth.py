from config import app, db, jwt
from models import User
from flask import request, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

bcrypt = Bcrypt(app)

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    hashed_pw = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    user = User(name=data['name'], email=data['email'], password_hash=hashed_pw, user_type=data['user_type'], phone_number=data['phone_number'])
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "User registered"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and bcrypt.check_password_hash(user.password_hash, data['password']):
        access_token = create_access_token(identity=user.id)
        return jsonify({"access_token": access_token, "user": user.to_dict()})
    return jsonify({"error": "Invalid credentials"}), 401

@app.route('/appointments', methods=['GET'])
@jwt_required()
def get_appointments():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify([a.to_dict() for a in user.appointments])
