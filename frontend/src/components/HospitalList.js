import { useEffect, useState } from 'react';

export default function HospitalList() {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    fetch('/hospitals')
      .then(r => r.json())
      .then(setHospitals);
  }, []);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {hospitals.map(h => (
        <div key={h.id} className="border p-4 rounded shadow">
          <h3 className="text-lg font-semibold">{h.name}</h3>
          <p>{h.address}</p>
          <a href={`https://www.google.com/maps?q=${h.latitude},${h.longitude}`}
             target="_blank" rel="noopener noreferrer"
             className="text-blue-500 underline">Map</a>
        </div>
      ))}
    </div>
  );
}
