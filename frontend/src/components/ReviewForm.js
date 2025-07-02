import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function ReviewForm({ hospitalId = null, doctorId = null, onSuccess }) {
  const { token } = useContext(AuthContext);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5555/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ hospital_id: hospitalId, doctor_id: doctorId, rating, comment }),
    })
      .then((r) => {
        if (!r.ok) return r.json().then((err) => Promise.reject(err));
        return r.json();
      })
      .then((data) => {
        setComment('');
        setRating(5);
        onSuccess && onSuccess(data);
      })
      .catch((err) => setError(err.error || ''));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mt-4">
      <textarea
        className="w-full border p-2 rounded"
        placeholder="Write your review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      />
      <div>
        <label className="block text-sm">Rating: {rating}</label>
        <input
          type="range"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit Review
      </button>
    </form>
  );
}
