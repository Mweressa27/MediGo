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
