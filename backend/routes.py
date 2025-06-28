from config import app, db
from flask import request, jsonify
from models import *
from flask_jwt_extended import jwt_required, get_jwt_identity

# HOSPITALS

@app.route('/hospitals', methods=['GET'])
def get_hospitals():
    hospitals = Hospital.query.all()
    return jsonify([h.to_dict() for h in hospitals])

@app.route('/hospitals/<int:id>', methods=['GET'])
def get_hospital(id):
    hospital = Hospital.query.get_or_404(id)
    return hospital.to_dict()

@app.route('/hospitals', methods=['POST'])
def create_hospital():
    data = request.get_json()
    hospital = Hospital(
        name=data['name'],
        address=data['address'],
        latitude=data['latitude'],
        longitude=data['longitude'],
        phone_number=data['phone_number']
    )
    db.session.add(hospital)
    db.session.commit()
    return hospital.to_dict(), 201

@app.route('/hospitals/<int:id>', methods=['PATCH'])
def update_hospital(id):
    data = request.get_json()
    hospital = Hospital.query.get_or_404(id)
    for key in data:
        setattr(hospital, key, data[key])
    db.session.commit()
    return hospital.to_dict()

@app.route('/hospitals/<int:id>', methods=['DELETE'])
def delete_hospital(id):
    hospital = Hospital.query.get_or_404(id)
    db.session.delete(hospital)
    db.session.commit()
    return {}, 204


# DOCTORS 

@app.route('/doctors', methods=['GET'])
def get_doctors():
    doctors = Doctor.query.all()
    return jsonify([d.to_dict() for d in doctors])

@app.route('/doctors/<int:id>', methods=['GET'])
def get_doctor(id):
    doctor = Doctor.query.get_or_404(id)
    return doctor.to_dict()

@app.route('/doctors', methods=['POST'])
def create_doctor():
    data = request.get_json()
    doctor = Doctor(
        name=data['name'],
        specialization=data['specialization'],
        hospital_id=data['hospital_id'],
        department_id=data['department_id']
    )
    db.session.add(doctor)
    db.session.commit()
    return doctor.to_dict(), 201

@app.route('/doctors/<int:id>', methods=['PATCH'])
def update_doctor(id):
    doctor = Doctor.query.get_or_404(id)
    data = request.get_json()
    for key in data:
        setattr(doctor, key, data[key])
    db.session.commit()
    return doctor.to_dict()

@app.route('/doctors/<int:id>', methods=['DELETE'])
def delete_doctor(id):
    doctor = Doctor.query.get_or_404(id)
    db.session.delete(doctor)
    db.session.commit()
    return {}, 204

# APPOINTMENTS 

@app.route('/appointments', methods=['GET'])
@jwt_required()
def get_appointments():
    user_id = get_jwt_identity()
    appointments = Appointment.query.filter_by(user_id=user_id).all()
    return jsonify([a.to_dict() for a in appointments])

@app.route('/appointments', methods=['POST'])
@jwt_required()
def create_appointment():
    data = request.get_json()
    user_id = get_jwt_identity()
    appointment = Appointment(
        user_id=user_id,
        doctor_id=data['doctor_id'],
        hospital_id=data['hospital_id'],
        appointment_date=data['appointment_date'],
        status='booked'
    )
    db.session.add(appointment)
    db.session.commit()
    return appointment.to_dict(), 201

@app.route('/appointments/<int:id>', methods=['PATCH'])
@jwt_required()
def update_appointment(id):
    appointment = Appointment.query.get_or_404(id)
    data = request.get_json()
    for key in data:
        setattr(appointment, key, data[key])
    db.session.commit()
    return appointment.to_dict()

@app.route('/appointments/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_appointment(id):
    appointment = Appointment.query.get_or_404(id)
    db.session.delete(appointment)
    db.session.commit()
    return {}, 204


# REVIEWS 

@app.route('/reviews', methods=['GET'])
def get_reviews():
    reviews = Review.query.all()
    return jsonify([r.to_dict() for r in reviews])

@app.route('/reviews', methods=['POST'])
@jwt_required()
def create_review():
    data = request.get_json()
    user_id = get_jwt_identity()
    review = Review(
        user_id=user_id,
        hospital_id=data.get('hospital_id'),
        doctor_id=data.get('doctor_id'),
        rating=data['rating'],
        comment=data['comment']
    )
    db.session.add(review)
    db.session.commit()
    return review.to_dict(), 201
