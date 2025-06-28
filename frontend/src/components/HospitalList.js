import { useEffect, useState } from 'react';

export default function HospitalList() {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    fetch('/hospitals')
      .then(r => r.json())
      .then(setHospitals);
  }, []);

  return (
    <div className="p-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {hospitals.map(h => (
        <div key={h.id} className="border rounded p-4 shadow">
          <h3 className="text-lg font-semibold">{h.name}</h3>
          <p>{h.address}</p>
        </div>
      ))}
    </div>
  );
}
