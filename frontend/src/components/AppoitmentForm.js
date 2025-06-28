import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function AppointmentForm() {
  const { doctorId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Book Appointment</h2>
      <Formik
        initialValues={{ appointment_date: '' }}
        validationSchema={Yup.object({
          appointment_date: Yup.string().required('Required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          fetch('/appointments', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
              doctor_id: doctorId,
              hospital_id: 1,
              appointment_date: values.appointment_date,
            }),
          })
          .then(r => { if (r.ok) navigate('/profile'); })
          .finally(() => setSubmitting(false));
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label>Date & Time</label>
              <Field name="appointment_date" type="datetime-local" className="block w-full border p-2"/>
              <ErrorMessage name="appointment_date" component="div" className="text-red-600"/>
            </div>
            <button type="submit" disabled={isSubmitting}
              className="bg-blue-600 text-white px-4 py-2 rounded">
              Book
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
