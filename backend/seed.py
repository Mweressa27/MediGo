from config import app, db
from models import *
from faker import Faker
fake = Faker()

with app.app_context():
    db.drop_all()
    db.create_all()

    # Create hospitals
    hosp1 = Hospital(name="Green Valley", address="Nairobi", latitude=-1.29, longitude=36.82, phone_number="0700123456")
    db.session.add(hosp1)

    # Create user
    user = User(name="John Doe", email="john@example.com", user_type="patient", phone_number="0712345678", password_hash="123")
    db.session.add(user)

    db.session.commit()
