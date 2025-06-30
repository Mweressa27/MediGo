import { useEffect, useState } from 'react';

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5555/appointments", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((r) => r.json())
      .then(setAppointments);
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Appointments</h1>
      {appointments.length === 0 ? (
        <p>No appointments yet.</p>
      ) : (
        <ul className="space-y-4">
          {appointments.map((appt) => (
            <li key={appt.id} className="p-4 border rounded shadow">
              <p><strong>Doctor ID:</strong> {appt.doctor_id}</p>
              <p><strong>Date:</strong> {new Date(appt.appointment_date).toLocaleString()}</p>
              <p><strong>Status:</strong> {appt.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
