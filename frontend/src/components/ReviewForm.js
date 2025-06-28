import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const ReviewForm = ({ doctorId, hospitalId, onSubmit }) => {
  return (
    <Formik
      initialValues={{ rating: '', comment: '' }}
      validationSchema={Yup.object({
        rating: Yup.number().min(1).max(5).required(),
        comment: Yup.string().required('Required'),
      })}
      onSubmit={(values, { resetForm }) => {
        const payload = {
          ...values,
          doctor_id: doctorId || null,
          hospital_id: hospitalId || null,
        }
        onSubmit(payload)
        resetForm()
      }}
    >
      <Form className="space-y-4">
        <div>
          <label>Rating</label>
          <Field type="number" name="rating" min={1} max={5} className="input" />
          <ErrorMessage name="rating" component="div" className="text-red-500 text-sm" />
        </div>
        <div>
          <label>Comment</label>
          <Field as="textarea" name="comment" className="input h-24" />
          <ErrorMessage name="comment" component="div" className="text-red-500 text-sm" />
        </div>
        <button type="submit" className="btn btn-primary">Submit Review</button>
      </Form>
    </Formik>
  )
}

export default ReviewForm
