class User(db.Model):
    __tablename__ = 'users'

    user_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    phone_number = db.Column(db.String)
    user_type = db.Column(db.String)

    appointments = db.relationship("Appointment", back_populates="user")
    reviews = db.relationship("Review", back_populates="user")

class Hospital(db.Model):
    __tablename__ = 'hospitals'

    hospital_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    address = db.Column(db.String)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    phone_number = db.Column(db.String)

    departments = db.relationship("Department", back_populates="hospital")
    doctors = db.relationship("Doctor", back_populates="hospital")
    appointments = db.relationship("Appointment", back_populates="hospital")
    reviews = db.relationship("Review", back_populates="hospital")

class Department(db.Model):
    __tablename__ = 'departments'

    department_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    hospital_id = db.Column(db.Integer, db.ForeignKey('hospitals.hospital_id'))

    hospital = db.relationship("Hospital", back_populates="departments")
    doctors = db.relationship("Doctor", back_populates="department")

doctor_insurance = db.Table('doctor_insurance',
    db.Column('doctor_id', db.Integer, db.ForeignKey('doctors.doctor_id'), primary_key=True),
    db.Column('insurance_id', db.Integer, db.ForeignKey('insurance_providers.insurance_id'), primary_key=True)
)

class Doctor(db.Model):
    __tablename__ = 'doctors'

    doctor_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    specialization = db.Column(db.String)
    hospital_id = db.Column(db.Integer, db.ForeignKey('hospitals.hospital_id'))
    department_id = db.Column(db.Integer, db.ForeignKey('departments.department_id'))

    hospital = db.relationship("Hospital", back_populates="doctors")
    department = db.relationship("Department", back_populates="doctors")
    appointments = db.relationship("Appointment", back_populates="doctor")
    reviews = db.relationship("Review", back_populates="doctor")
    insurances = db.relationship("InsuranceProvider", secondary=doctor_insurance, back_populates="doctors")

class InsuranceProvider(db.Model):
    __tablename__ = 'insurance_providers'

    insurance_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    contact_info = db.Column(db.String)

    doctors = db.relationship("Doctor", secondary=doctor_insurance, back_populates="insurances")

class Appointment(db.Model):
    __tablename__ = 'appointments'

    appointment_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctors.doctor_id'))
    hospital_id = db.Column(db.Integer, db.ForeignKey('hospitals.hospital_id'))
    appointment_date = db.Column(db.DateTime)
    status = db.Column(db.String)  # e.g., "booked", "cancelled", "completed"

    user = db.relationship("User", back_populates="appointments")
    doctor = db.relationship("Doctor", back_populates="appointments")
    hospital = db.relationship("Hospital", back_populates="appointments")

class Review(db.Model):
    __tablename__ = 'reviews'

    review_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    hospital_id = db.Column(db.Integer, db.ForeignKey('hospitals.hospital_id'), nullable=True)
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctors.doctor_id'), nullable=True)
    rating = db.Column(db.Integer)
    comment = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship("User", back_populates="reviews")
    hospital = db.relationship("Hospital", back_populates="reviews")
    doctor = db.relationship("Doctor", back_populates="reviews")

