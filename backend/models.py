from config import db
from datetime import datetime
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

# Association table for many-to-many relationship between doctors and insurance providers
doctor_insurance = db.Table('doctor_insurance',
    db.Column('doctor_id', db.Integer, db.ForeignKey('doctors.id'), primary_key=True),
    db.Column('insurance_id', db.Integer, db.ForeignKey('insurance_providers.id'), primary_key=True)
)

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password_hash = db.Column(db.String, nullable=False)
    phone_number = db.Column(db.String)
    user_type = db.Column(db.String, nullable=False)  # 'patient' or 'admin'

    appointments = db.relationship('Appointment', backref='user', cascade='all, delete-orphan')
    reviews = db.relationship('Review', backref='user', cascade='all, delete-orphan')

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        if self.user_type not in ['patient', 'admin']:
            raise ValueError("user_type must be 'patient' or 'admin'")

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

    def is_patient(self):
        return self.user_type == 'patient'

    def is_admin(self):
        return self.user_type == 'admin'

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone_number': self.phone_number,
            'user_type': self.user_type
        }


class Hospital(db.Model):
    __tablename__ = 'hospitals'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    address = db.Column(db.String)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    phone_number = db.Column(db.String)
    image_url = db.Column(db.String)

    departments = db.relationship('Department', backref='hospital', cascade='all, delete')
    doctors = db.relationship('Doctor', backref='hospital', cascade='all, delete')
    appointments = db.relationship('Appointment', backref='hospital', cascade='all, delete')
    reviews = db.relationship('Review', backref='hospital', cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'address': self.address,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'phone_number': self.phone_number,
            'image_url': self.image_url
        }


class Department(db.Model):
    __tablename__ = 'departments'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    hospital_id = db.Column(db.Integer, db.ForeignKey('hospitals.id'))
    doctors = db.relationship('Doctor', backref='department', cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'hospital_id': self.hospital_id
        }


class Doctor(db.Model):
    __tablename__ = 'doctors'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    specialization = db.Column(db.String)

    hospital_id = db.Column(db.Integer, db.ForeignKey('hospitals.id'))
    department_id = db.Column(db.Integer, db.ForeignKey('departments.id'))

    appointments = db.relationship('Appointment', backref='doctor', cascade='all, delete')
    reviews = db.relationship('Review', backref='doctor', cascade='all, delete')
    insurance_providers = db.relationship('InsuranceProvider', secondary=doctor_insurance, backref='doctors')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'specialization': self.specialization,
            'hospital_id': self.hospital_id,
            'department_id': self.department_id,
            'insurance_providers': [provider.to_dict() for provider in self.insurance_providers]
        }


class InsuranceProvider(db.Model):
    __tablename__ = 'insurance_providers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    contact_info = db.Column(db.String)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'contact_info': self.contact_info
        }


class Appointment(db.Model):
    __tablename__ = 'appointments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctors.id'))
    hospital_id = db.Column(db.Integer, db.ForeignKey('hospitals.id'))

    appointment_date = db.Column(db.DateTime)
    status = db.Column(db.String)  # booked, cancelled, completed

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'doctor_id': self.doctor_id,
            'hospital_id': self.hospital_id,
            'appointment_date': self.appointment_date.isoformat(),
            'status': self.status
        }


class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    hospital_id = db.Column(db.Integer, db.ForeignKey('hospitals.id'), nullable=True)
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctors.id'), nullable=True)

    rating = db.Column(db.Integer)
    comment = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'hospital_id': self.hospital_id,
            'doctor_id': self.doctor_id,
            'rating': self.rating,
            'comment': self.comment,
            'created_at': self.created_at.isoformat()
        }
