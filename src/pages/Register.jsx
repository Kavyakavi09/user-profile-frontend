import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useSnackbar } from 'react-simple-snackbar';
import axios from 'axios';
import { API_URL } from '../Global';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Auth = () => {
  const [openSnackbar] = useSnackbar();
  const navigate = useNavigate();

  let formik = useFormik({
    initialValues,
    validationSchema: yup.object({
      firstName: yup
        .string('Enter your name')
        .max(25, 'Must be 25 characters or less')
        .required('* Required'),
      lastName: yup
        .string('Enter your name')
        .max(25, 'Must be 25 characters or less')
        .required('* Required'),
      email: yup
        .string('Enter your email')
        .required('* Required')
        .email('Enter a vaild Email'),
      password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('*Password is required'),
      confirmPassword: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .when('password', {
          is: (val) => (val && val?.length > 0 ? true : false),
          then: yup
            .string()
            .oneOf([yup.ref('password')], 'Both password need to be the same'),
        })
        .required('Confirm Password Required'),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.post(`${API_URL}/auth/signup`, values);
        openSnackbar(res?.data?.message);
        navigate('/login');
      } catch (error) {
        openSnackbar(error?.response?.data?.message);
      }
    },
  });

  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='col-sm-10 col-md-8 col-lg-6 col-xl-4 mx-auto'>
            <div className='card border-0 shadow rounded-5 my-5'>
              <div className='card-body p-4 p-sm-5'>
                <h5 className='card-title text-center mb-3 fw-light fs-5'>
                  Sign Up
                </h5>
                <form onSubmit={formik.handleSubmit}>
                  <div className='form-floating mb-3'>
                    <input
                      type='text'
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.firstName}
                      name='firstName'
                      className='form-control'
                      id='firstName'
                      placeholder='Enter your first name'
                      style={{
                        border: formik.errors.firstName
                          ? '1px solid red'
                          : formik.values.firstName.length <= 25 &&
                            formik.values.firstName.length !== 0
                          ? '1px solid green'
                          : '',
                      }}
                    />
                    <label htmlFor='floatingInput'> First Name</label>
                    {formik.touched.firstName && formik.errors.firstName ? (
                      <small style={{ color: 'red' }}>
                        {formik.errors.firstName}
                      </small>
                    ) : null}
                    {formik.values.firstName.length <= 25 &&
                    formik.values.firstName.length !== 0 ? (
                      <small style={{ color: 'green' }}>Looks good!</small>
                    ) : null}
                  </div>

                  <div className='form-floating mb-3'>
                    <input
                      type='text'
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.lastName}
                      name='lastName'
                      className='form-control'
                      id='lastName'
                      placeholder='Enter your last name'
                      style={{
                        border: formik.errors.lastName
                          ? '1px solid red'
                          : formik.values.lastName.length <= 25 &&
                            formik.values.lastName.length !== 0
                          ? '1px solid green'
                          : '',
                      }}
                    />
                    <label htmlFor='floatingInput'> Last Name</label>
                    {formik.touched.lastName && formik.errors.lastName ? (
                      <small style={{ color: 'red' }}>
                        {formik.errors.lastName}
                      </small>
                    ) : null}
                    {formik.values.lastName.length <= 25 &&
                    formik.values.lastName.length !== 0 ? (
                      <small style={{ color: 'green' }}>Looks good!</small>
                    ) : null}
                  </div>

                  <div className='form-floating mb-3'>
                    <input
                      type='email'
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      name='email'
                      value={formik.values.email}
                      className='form-control'
                      id='email'
                      placeholder='name@example.com'
                      style={{
                        border: formik.errors.email
                          ? '1px solid red'
                          : formik.values.email !== '' && !formik.errors.email
                          ? '1px solid green'
                          : '',
                      }}
                    />
                    <label htmlFor='floatingInput'>Email address</label>
                    {formik.touched.email && formik.errors.email ? (
                      <small style={{ color: 'red' }}>
                        {formik.errors.email}
                      </small>
                    ) : null}

                    {formik.values.email !== '' && !formik.errors.email ? (
                      <small style={{ color: 'green' }}>Looks good!</small>
                    ) : null}
                  </div>
                  <div className='form-floating mb-3'>
                    <input
                      type='password'
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      name='password'
                      className='form-control'
                      id='password'
                      placeholder='Password'
                      style={{
                        border: formik.errors.password
                          ? '1px solid red'
                          : formik.values.password !== '' &&
                            !formik.errors.password
                          ? '1px solid green'
                          : '',
                      }}
                    />
                    <label htmlFor='floatingPassword'>Password</label>
                    {formik.touched.password && formik.errors.password ? (
                      <small style={{ color: 'red' }}>
                        {formik.errors.password}
                      </small>
                    ) : null}
                    {formik.values.password.length >= 8 &&
                    formik.values.password.length !== 0 ? (
                      <small style={{ color: 'green' }}>Looks good!</small>
                    ) : null}
                  </div>
                  <div className='form-floating mb-3'>
                    <input
                      type='password'
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.confirmPassword}
                      name='confirmPassword'
                      className='form-control form-control-sm'
                      id='floatingPassword'
                      placeholder='Confirm Password'
                      style={{
                        border: formik.errors.confirmPassword
                          ? '1px solid red'
                          : formik.values.confirmPassword !== '' &&
                            !formik.errors.confirmPassword
                          ? '1px solid green'
                          : '',
                      }}
                    />
                    <label htmlFor='floatingPassword'>Confirm Password</label>
                    {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword ? (
                      <small style={{ color: 'red' }}>
                        {formik.errors.confirmPassword}
                      </small>
                    ) : null}
                  </div>
                  <div className='d-grid mb-2'>
                    <button
                      className='btn btn-primary btn-login fw-bold text-uppercase'
                      type='submit'>
                      Register
                    </button>
                  </div>

                  <Link
                    to={'/login'}
                    className='d-block text-center mt-3 text-decoration-none'>
                    Have an account? Sign In
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
