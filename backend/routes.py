from flask import Blueprint, request, jsonify
from config import db
from models import *
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime

routes_bp = Blueprint('routes', __name__)

# HOSPITALS 
@routes_bp.route('/hospitals', methods=['GET'])
def get_hospitals():
    search = request.args.get('q')
    query = Hospital.query
    if search:
        query = query.filter(
            db.or_(
                Hospital.name.ilike(f"%{search}%"),
                Hospital.address.ilike(f"%{search}%")
            )
        )
    hospitals = query.all()
    return jsonify([h.to_dict() for h in hospitals]), 200

@routes_bp.route('/hospitals/<int:id>', methods=['GET'])
def get_hospital(id):
    hospital = Hospital.query.get_or_404(id)
    data = hospital.to_dict()
    data['departments'] = [d.to_dict() for d in hospital.departments]
    data['doctors'] = [
        {
            **d.to_dict(),
            "insurance_providers": [ip.to_dict() for ip in d.insurance_providers]
        }
        for d in hospital.doctors
    ]
    return jsonify(data), 200

@routes_bp.route('/hospitals', methods=['POST'])
def create_hospital():
    data = request.get_json()
    hospital = Hospital(**data)
    db.session.add(hospital)
    db.session.commit()
    return hospital.to_dict(), 201

@routes_bp.route('/hospitals/<int:id>', methods=['PATCH'])
def update_hospital(id):
    data = request.get_json()
    hospital = Hospital.query.get_or_404(id)
    for key, value in data.items():
        setattr(hospital, key, value)
    db.session.commit()
    return hospital.to_dict(), 200

@routes_bp.route('/hospitals/<int:id>', methods=['DELETE'])
def delete_hospital(id):
    hospital = Hospital.query.get_or_404(id)
    db.session.delete(hospital)
    db.session.commit()
    return {}, 204


# DOCTORS 

@routes_bp.route('/doctors', methods=['GET'])
def get_doctors():
    search = request.args.get('q')
    query = Doctor.query
    if search:
        query = query.filter(Doctor.name.ilike(f"%{search}%"))
    doctors = query.all()
    return jsonify([d.to_dict() for d in doctors]), 200

@routes_bp.route('/doctors/<int:id>', methods=['GET'])
def get_doctor(id):
    doctor = Doctor.query.get_or_404(id)
    return doctor.to_dict(), 200

@routes_bp.route('/doctors', methods=['POST'])
def create_doctor():
    data = request.get_json()
    doctor = Doctor(**data)
    db.session.add(doctor)
    db.session.commit()
    return doctor.to_dict(), 201

@routes_bp.route('/doctors/<int:id>', methods=['PATCH'])
def update_doctor(id):
    doctor = Doctor.query.get_or_404(id)
    data = request.get_json()
    for key, value in data.items():
        setattr(doctor, key, value)
    db.session.commit()
    return doctor.to_dict(), 200

@routes_bp.route('/doctors/<int:id>', methods=['DELETE'])
def delete_doctor(id):
    doctor = Doctor.query.get_or_404(id)
    db.session.delete(doctor)
    db.session.commit()
    return {}, 204


# APPOINTMENTS 

@routes_bp.route('/appointments', methods=['GET'])
@jwt_required()
def get_appointments():
    user_id = get_jwt_identity()
    appointments = Appointment.query.filter_by(user_id=user_id).all()
    return jsonify([a.to_dict() for a in appointments]), 200

@routes_bp.route('/appointments', methods=['POST'])
@jwt_required()
def create_appointment():
    data = request.get_json()

    try:
        user_id = get_jwt_identity()
        doctor_id = data.get('doctor_id')
        hospital_id = data.get('hospital_id')
        appointment_date_str = data.get('appointment_date')

        if not all([doctor_id, hospital_id, appointment_date_str]):
            return jsonify({'error': 'Missing required fields.'}), 400

        try:
            appointment_date = datetime.fromisoformat(appointment_date_str)
        except ValueError:
            return jsonify({'error': 'Invalid date format. Use ISO 8601 format.'}), 400

        appointment = Appointment(
            user_id=user_id,
            doctor_id=doctor_id,
            hospital_id=hospital_id,
            appointment_date=appointment_date,
            status='booked'
        )

        db.session.add(appointment)
        db.session.commit()
        return appointment.to_dict(), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@routes_bp.route('/appointments/<int:id>', methods=['PATCH'])
@jwt_required()
def update_appointment(id):
    appointment = Appointment.query.get_or_404(id)
    data = request.get_json()
    for key, value in data.items():
        setattr(appointment, key, value)
    db.session.commit()
    return appointment.to_dict(), 200

@routes_bp.route('/appointments/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_appointment(id):
    appointment = Appointment.query.get_or_404(id)
    db.session.delete(appointment)
    db.session.commit()
    return {}, 204


# REVIEWS 

@routes_bp.route('/reviews', methods=['GET'])
def get_reviews():
    doctor_id = request.args.get('doctor_id')
    hospital_id = request.args.get('hospital_id')
    query = Review.query
    if doctor_id:
        query = query.filter_by(doctor_id=doctor_id)
    if hospital_id:
        query = query.filter_by(hospital_id=hospital_id)
    reviews = query.order_by(Review.created_at.desc()).all()
    return jsonify([r.to_dict() for r in reviews]), 200

@routes_bp.route('/reviews', methods=['POST'])
@jwt_required()
def create_review():
    data = request.get_json()
    try:
        review = Review(
            user_id=get_jwt_identity(),
            hospital_id=data.get('hospital_id'),
            doctor_id=data.get('doctor_id'),
            rating=data['rating'],
            comment=data['comment']
        )
        db.session.add(review)
        db.session.commit()
        return review.to_dict(), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400


# INSURANCE PROVIDERS 

@routes_bp.route('/insurance_providers', methods=['GET'])
def get_insurance_providers():
    providers = InsuranceProvider.query.all()
    return jsonify([p.to_dict() for p in providers]), 200

# ADMIN DASHBOARD

@routes_bp.route('/admin/appointments', methods=['GET'])
@jwt_required()
def get_all_appointments():
    user_id = get_jwt_identity()
    user = User.query.get_or_404(user_id)

    if user.user_type != 'admin':
        return jsonify({'error': 'Unauthorized'}), 403

    appointments = Appointment.query.order_by(Appointment.appointment_date.desc()).all()
    return jsonify([a.to_dict() for a in appointments]), 200
