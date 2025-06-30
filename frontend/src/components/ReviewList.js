import { useEffect, useState } from 'react';

export default function ReviewsList({ hospitalId = null, doctorId = null }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const query = hospitalId ? `hospital_id=${hospitalId}` : `doctor_id=${doctorId}`;
    fetch(`http://localhost:5555/reviews?${query}`)
      .then((r) => r.json())
      .then(setReviews)
      .catch(console.error);
  }, [hospitalId, doctorId]);

  if (reviews.length === 0) return <p className="text-gray-500">No reviews yet.</p>;

  return (
    <ul className="space-y-3 mt-4">
      {reviews.map((review) => (
        <li key={review.id} className="border rounded p-3 bg-white shadow">
          <p className="text-sm text-gray-700">{review.comment}</p>
          <p className="text-sm text-yellow-600">⭐ {review.rating}</p>
          <p className="text-xs text-gray-400">Posted on {new Date(review.created_at).toLocaleDateString()}</p>
        </li>
      ))}
    </ul>
  );
}
