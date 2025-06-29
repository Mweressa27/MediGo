import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Login to MediGo</h2>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string().email('Invalid email').required('Email is required'),
          password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
        })}
        onSubmit={(values, { setSubmitting, setStatus }) => {
          fetch('http://localhost:5555/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
          })
            .then((r) =>
              r.json().then((data) => {
                if (r.ok) {
                  login(data.access_token);
                  navigate('/hospitals');
                } else {
                  setStatus(data.error);
                }
              })
            )
            .finally(() => setSubmitting(false));
        }}
      >
        {({ isSubmitting, status }) => (
          <Form className="space-y-5">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Email</label>
              <Field
                name="email"
                type="email"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="email" component="div" className="text-sm text-red-500 mt-1" />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Password</label>
              <Field
                name="password"
                type="password"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="password" component="div" className="text-sm text-red-500 mt-1" />
            </div>

            {status && <div className="text-red-500 text-sm">{status}</div>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </Form>
        )}
      </Formik>

      <p className="mt-4 text-center text-sm text-gray-600">
        Don’t have an account?{' '}
        <a href="/register" className="text-blue-600 hover:underline">
          Register here
        </a>
      </p>
    </div>
  );
}
