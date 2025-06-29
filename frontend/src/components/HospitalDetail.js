import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function HospitalDetail() {
  const { id } = useParams();
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5555/hospitals/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setHospital(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching hospital:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading hospital...</p>;
  if (!hospital) return <p className="text-center mt-10">Hospital not found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{hospital.name}</h1>
      <p>{hospital.address}</p>
      <p className="text-sm text-gray-500">{hospital.phone_number}</p>
      {hospital.image_url && (
        <img src={hospital.image_url} alt={hospital.name} className="my-4 w-full max-w-lg rounded" />
      )}

      {/* You can add these sections once your backend sends them */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold">Departments</h2>
        <ul className="list-disc list-inside">
          {hospital.departments?.map((dept) => (
            <li key={dept.id}>{dept.name}</li>
          ))}
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Doctors</h2>
        <ul className="space-y-2">
          {hospital.doctors?.map((doc) => (
            <li key={doc.id} className="border p-3 rounded">
              <p className="font-medium">{doc.name}</p>
              <p className="text-sm text-gray-600">{doc.specialization}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
