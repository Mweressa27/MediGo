from config import app, db
from routes import *
from auth import *

@app.route('/')
def home():
    return {"message": "Welcome to MediGo API"}

# REGISTER 

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already in use'}), 400

    new_user = User(
        name=data['name'],
        email=data['email'],
        phone_number=data['phone_number'],
        user_type=data['user_type']
    )
    new_user.set_password(data['password'])
    db.session.add(new_user)
    db.session.commit()

    access_token = create_access_token(identity=new_user.id)
    return jsonify({'access_token': access_token, 'user': new_user.to_dict()}), 201

    # LOGIN 

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()

    if user and user.check_password(data['password']):
        access_token = create_access_token(identity=user.id)
        return jsonify({'access_token': access_token, 'user': user.to_dict()}), 200
    return jsonify({'error': 'Invalid credentials'}), 401

if __name__ == '__main__':
    app.run(port=5555, debug=True)
