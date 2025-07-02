import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReviewsList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';

export default function HospitalDetail() {
  const { id } = useParams();
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAppointments, setSelectedAppointments] = useState({});
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5555/hospitals/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error('Failed to fetch hospital');
        return r.json();
      })
      .then((data) => {
        setHospital(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading hospital:', err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (doctorId, value) => {
    setSelectedAppointments((prev) => ({
      ...prev,
      [doctorId]: value,
    }));
  };

  const handleBook = async (doctorId) => {
    const token = localStorage.getItem('token');
    const appointmentDate = selectedAppointments[doctorId];

    if (!appointmentDate) {
      alert('Please select a date');
      return;
    }

    const res = await fetch('http://localhost:5555/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        doctor_id: doctorId,
        hospital_id: hospital.id,
        appointment_date: new Date(appointmentDate).toISOString(),
      }),
    });

    if (res.ok) {
      setFeedback('Appointment booked successfully!');
    } else {
      const err = await res.json();
      console.error(err);
      setFeedback(err.error || 'Failed to book appointment.');
    }
  };

  if (loading) return <p className="text-center mt-10">Loading hospital...</p>;
  if (!hospital) return <p className="text-center mt-10 text-red-500">Hospital not found.</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{hospital.name}</h1>
      <p className="text-gray-600">{hospital.address}</p>
      <p className="text-gray-500 text-sm">📞 {hospital.phone_number}</p>

      {/* Departments */}
      <h2 className="text-2xl font-semibold mt-6 mb-2">Departments</h2>
      {hospital.departments && hospital.departments.length > 0 ? (
        <ul className="list-disc ml-6 text-gray-700">
          {hospital.departments.map((dept) => (
            <li key={dept.id}>{dept.name}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No departments available.</p>
      )}

      {/* Doctors & Appointment Booking */}
      <h2 className="text-2xl font-semibold mt-8 mb-2">Doctors</h2>
      {hospital.doctors.length === 0 ? (
        <p>No doctors listed.</p>
      ) : (
        <div className="space-y-4 mt-4">
          {hospital.doctors.map((doctor) => (
            <div key={doctor.id} className="p-4 border rounded-xl bg-white shadow">
              <h3 className="text-lg font-bold">{doctor.name}</h3>
              <p className="text-gray-600">Specialization: {doctor.specialization}</p>

              <div className="mt-1 text-sm text-gray-500">
                <strong>Accepted Insurance:</strong>{' '}
                {doctor.insurance_providers && doctor.insurance_providers.length > 0 ? (
                  <ul className="list-disc ml-5">
                    {doctor.insurance_providers.map((ip) => (
                      <li key={ip.id}>{ip.name}</li>
                    ))}
                  </ul>
                ) : (
                  <span>None listed</span>
                )}
              </div>

              <div className="mt-3">
                <input
                  type="datetime-local"
                  value={selectedAppointments[doctor.id] || ''}
                  onChange={(e) => handleChange(doctor.id, e.target.value)}
                  className="border p-2 rounded mr-2"
                />
                <button
                  onClick={() => handleBook(doctor.id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {feedback && <p className="mt-4 text-green-600">{feedback}</p>}

      {/* Reviews Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-2">Reviews</h2>
        <ReviewsList hospitalId={hospital.id} />
        <ReviewForm hospitalId={hospital.id} onSuccess={() => window.location.reload()} />
      </div>
    </div>
  );
}

