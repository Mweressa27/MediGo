from config import app, db
from models import *

with app.app_context():
    db.drop_all()
    db.create_all()

    # Create hospitals with images
    h1 = Hospital(
        name="Nairobi Hospital",
        address="Upper Hill",
        latitude=-1.302,
        longitude=36.806,
        phone_number="020-2845000",
        image_url="https://images.unsplash.com/photo-1584438784894-089d6a62b8e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
    )
    h2 = Hospital(
        name="Aga Khan Hospital",
        address="Parklands",
        latitude=-1.261,
        longitude=36.815,
        phone_number="020-3662000",
        image_url="https://images.unsplash.com/photo-1600959907703-952d3f62c1a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
    )

    # Create departments
    d1 = Department(name="Cardiology", hospital=h1)
    d2 = Department(name="Neurology", hospital=h1)
    d3 = Department(name="Pediatrics", hospital=h2)

    # Create doctors
    doc1 = Doctor(name="Dr. Kamau", specialization="Cardiologist", hospital=h1, department=d1)
    doc2 = Doctor(name="Dr. Achieng", specialization="Neurologist", hospital=h1, department=d2)
    doc3 = Doctor(name="Dr. Patel", specialization="Pediatrician", hospital=h2, department=d3)

    # Create insurance providers
    i1 = InsuranceProvider(name="NHIF", contact_info="nhif.go.ke")
    i2 = InsuranceProvider(name="Jubilee", contact_info="jubileeinsurance.com")

    doc1.insurance_providers.extend([i1, i2])
    doc2.insurance_providers.append(i1)

    # Create users
    u1 = User(name="John Doe", email="john@example.com", phone_number="0712345678", user_type="patient")
    u1.set_password("password123")

    u2 = User(name="Admin", email="admin@medigo.com", phone_number="0700000000", user_type="admin")
    u2.set_password("admin123")

    # Commit everything
    db.session.add_all([h1, h2, d1, d2, d3, doc1, doc2, doc3, i1, i2, u1, u2])
    db.session.commit()
    
