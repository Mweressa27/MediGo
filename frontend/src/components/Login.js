import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string().email('Invalid email').required('Required'),
          password: Yup.string().min(6).required('Required'),
        })}
        onSubmit={(values, { setSubmitting, setStatus }) => {
          fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
          })
          .then(r => r.json().then(data => {
            if (r.ok) {
              login(data.access_token);
              navigate('/hospitals');
            } else {
              setStatus(data.error);
            }
          }))
          .finally(() => setSubmitting(false));
        }}
      >
        {({ isSubmitting, status }) => (
          <Form className="space-y-4">
            <div>
              <label>Email</label>
              <Field name="email" type="email" className="input" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div>
              <label>Password</label>
              <Field name="password" type="password" className="input" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            {status && <div className="text-red-500">{status}</div>}
            <button type="submit" disabled={isSubmitting} className="btn-blue">Login</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
