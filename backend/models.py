from config import db
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime

# Association table for many-to-many relationship
doctor_insurance = db.Table('doctor_insurance',
    db.Column('doctor_id', db.Integer, db.ForeignKey('doctors.id'), primary_key=True),
    db.Column('insurance_id', db.Integer, db.ForeignKey('insurance_providers.id'), primary_key=True)
)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String, unique=True)
    password_hash = db.Column(db.String)
    phone_number = db.Column(db.String)
    user_type = db.Column(db.String)  # patient, doctor, admin

    appointments = db.relationship('Appointment', backref='user', cascade='all, delete')
    reviews = db.relationship('Review', backref='user', cascade='all, delete')

    serialize_rules = ('-appointments.user', '-reviews.user')

class Hospital(db.Model, SerializerMixin):
    __tablename__ = 'hospitals'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    address = db.Column(db.String)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    phone_number = db.Column(db.String)

    departments = db.relationship('Department', backref='hospital', cascade='all, delete')
    doctors = db.relationship('Doctor', backref='hospital', cascade='all, delete')
    appointments = db.relationship('Appointment', backref='hospital', cascade='all, delete')
    reviews = db.relationship('Review', backref='hospital', cascade='all, delete')

class Department(db.Model, SerializerMixin):
    __tablename__ = 'departments'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    hospital_id = db.Column(db.Integer, db.ForeignKey('hospitals.id'))

    doctors = db.relationship('Doctor', backref='department', cascade='all, delete')

class Doctor(db.Model, SerializerMixin):
    __tablename__ = 'doctors'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    specialization = db.Column(db.String)

    hospital_id = db.Column(db.Integer, db.ForeignKey('hospitals.id'))
    department_id = db.Column(db.Integer, db.ForeignKey('departments.id'))

    appointments = db.relationship('Appointment', backref='doctor', cascade='all, delete')
    reviews = db.relationship('Review', backref='doctor', cascade='all, delete')
    insurance_providers = db.relationship('InsuranceProvider', secondary=doctor_insurance, backref='doctors')

class InsuranceProvider(db.Model, SerializerMixin):
    __tablename__ = 'insurance_providers'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    contact_info = db.Column(db.String)

class Appointment(db.Model, SerializerMixin):
    __tablename__ = 'appointments'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctors.id'))
    hospital_id = db.Column(db.Integer, db.ForeignKey('hospitals.id'))

    appointment_date = db.Column(db.DateTime)
    status = db.Column(db.String)  # booked, cancelled, completed

    serialize_rules = ('-user.appointments', '-doctor.appointments', '-hospital.appointments')

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    hospital_id = db.Column(db.Integer, db.ForeignKey('hospitals.id'), nullable=True)
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctors.id'), nullable=True)

    rating = db.Column(db.Integer)
    comment = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
