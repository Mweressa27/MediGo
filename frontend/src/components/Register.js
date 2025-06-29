import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Register = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    email: '',
    password: '',
    phone_number: '',
    user_type: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    phone_number: Yup.string()
      .matches(/^\+?\d{10,15}$/, 'Invalid phone number')
      .required('Phone number is required'),
    user_type: Yup.string()
      .oneOf(['patient', 'doctor', 'admin'], 'Select a valid user type')
      .required('User type is required'),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await fetch('http://localhost:5555/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        navigate('/login');
      } else {
        const data = await response.json();
        setErrors({ email: data.error || 'Registration failed' });
      }
    } catch (err) {
      console.error(err);
      setErrors({ email: 'Network error. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label className="block font-medium">Name</label>
              <Field name="name" type="text" className="w-full input" />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block font-medium">Email</label>
              <Field name="email" type="email" className="w-full input" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block font-medium">Password</label>
              <Field name="password" type="password" className="w-full input" />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block font-medium">Phone Number</label>
              <Field name="phone_number" type="text" className="w-full input" />
              <ErrorMessage name="phone_number" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block font-medium">User Type</label>
              <Field as="select" name="user_type" className="w-full input">
                <option value="">Select user type</option>
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="admin">Admin</option>
              </Field>
              <ErrorMessage name="user_type" component="div" className="text-red-500 text-sm" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
