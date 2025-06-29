import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function HospitalList() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5555/hospitals')
      .then((r) => {
        if (!r.ok) throw new Error('Failed to fetch hospitals');
        return r.json();
      })
      .then((data) => {
        setHospitals(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching hospitals:", err);
        setError('Failed to load hospitals.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading hospitals...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (hospitals.length === 0) return <p className="text-center mt-10">No hospitals available.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Available Hospitals</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hospitals.map((hospital) => (
          <div key={hospital.id} className="bg-white rounded-2xl shadow p-4 flex flex-col gap-3">
            {hospital.image_url && (
              <img
                src={hospital.image_url}
                alt={hospital.name}
                className="w-full h-40 object-cover rounded-xl"
              />
            )}
            <h2 className="text-xl font-semibold">{hospital.name}</h2>
            <p className="text-gray-700">{hospital.address}</p>
            <p className="text-gray-500 text-sm">📞 {hospital.phone_number}</p>
            <Link to={`/hospitals/${hospital.id}`}>
              <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
