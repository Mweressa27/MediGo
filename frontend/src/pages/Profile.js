import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Profile() {
  const { user, token } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch('/appointments', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(setAppointments);
  }, [token]);

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold">Profile</h2>
      <p><strong>{user.name}</strong> ({user.user_type})</p>
      <h3 className="mt-4 font-semibold">Appointments</h3>
      <ul className="list-disc ml-5">
        {appointments.map(a => (
          <li key={a.id}>
            {new Date(a.appointment_date).toLocaleString()} with Doctor #{a.doctor_id} – {a.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
