import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function AdminDashboard() {
  const { token, user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || user.user_type !== 'admin') return;

    fetch('http://localhost:5555/admin/appointments', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch appointments');
        return res.json();
      })
      .then(setAppointments)
      .catch(err => {
        console.error(err);
        setError('Failed to load appointments');
      });
  }, [token, user]);

  if (!user || user.user_type !== 'admin') {
    return <p className="text-red-600 text-center mt-10">Access denied.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
      {error && <p className="text-red-500">{error}</p>}

      {appointments.length === 0 ? (
        <p>No appointments available.</p>
      ) : (
        <table className="w-full border rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Patient</th>
              <th className="py-2 px-4 text-left">Doctor</th>
              <th className="py-2 px-4 text-left">Hospital</th>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a.id} className="border-t">
                <td className="py-2 px-4">{a.user?.name || 'N/A'}</td>
                <td className="py-2 px-4">{a.doctor?.name || 'N/A'}</td>
                <td className="py-2 px-4">{a.hospital?.name || 'N/A'}</td>
                <td className="py-2 px-4">{new Date(a.appointment_date).toLocaleString()}</td>
                <td className="py-2 px-4 capitalize">{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
