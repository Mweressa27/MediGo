from config import app, db
from routes import *
from auth import *

@app.route('/')
def home():
    return {"message": "Welcome to MediGo API"}

if __name__ == '__main__':
    app.run(port=5555, debug=True)
