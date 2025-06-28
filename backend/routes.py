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
