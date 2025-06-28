from flask import Flask, jsonify
from config import app, db
from auth import auth_bp
from routes import routes_bp  # If you have custom routes in routes.py
from flask_cors import CORS

CORS(app, supports_credentials=True)

# Register Blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(routes_bp)  # Optional

@app.route('/')
def home():
    return {"message": "Welcome to MediGo API"}

if __name__ == '__main__':
    app.run(port=5555, debug=True)

