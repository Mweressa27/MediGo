import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function DoctorList() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch('/doctors')
      .then(r => r.json())
      .then(setDoctors);
  }, []);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {doctors.map(d => (
        <div key={d.id} className="border p-4 rounded shadow">
          <h3 className="text-lg font-semibold">{d.name}</h3>
          <p>Specialization: {d.specialization}</p>
          <Link to={`/book/${d.id}`} className="text-blue-500">Book Appointment</Link>
        </div>
      ))}
    </div>
  );
}
