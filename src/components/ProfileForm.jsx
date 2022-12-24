import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'react-simple-snackbar';
import moment from 'moment';
import swal from 'sweetalert';
import axios from 'axios';
import { API_URL } from '../Global';

function ProfileForm() {
  const navigate = useNavigate();

  const user = useSelector((state) => state?.user?.currentUser?.user);

  const [openSnackbar] = useSnackbar();

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  let formik = useFormik({
    initialValues: {
      name: user?.name,
      email: user?.email,
      age: '',
      gender: '',
      dob: '',
      mobile: '',
      city: '',
      street: '',
      houseNumber: '',
      state: '',
      pincode: '',
      country: '',
    },
    validationSchema: yup.object({
      email: yup
        .string('Enter your email')
        .required('* Required')
        .email('Enter a vaild Email'),
      name: yup
        .string('Enter your name')
        .max(25, 'Must be 25 characters or less')
        .required('* Required'),
      age: yup
        .number()
        .required('Please supply your age')
        .min(18, 'You must be at least 18 years')
        .max(60, 'You must be at most 60 years'),
      gender: yup.string().required('gender is required'),
      dob: yup.string().test('DOB', 'dob is not valid', (value) => {
        return moment().diff(moment(value), 'years') >= 18;
      }),
      mobile: yup
        .string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .required('* Required'),
      city: yup.string('Enter your city').required('* Required'),
      street: yup.string('Enter your street').required('* Required'),
      houseNumber: yup.string('Enter your house no').required('* Required'),
      state: yup.string('Enter your state').required('* Required'),
      country: yup.string('Enter your country').required('* Required'),
      pincode: yup
        .number()
        .test(
          'len',
          'Must be exactly 6 characters',
          (val) => val && val.toString().length === 6
        )
        .required('* Required'),
    }),
    onSubmit: async (values) => {
      const {
        city,
        street,
        houseNumber,
        state,
        pincode,
        country,
        ...otherValues
      } = values;

      let payload = {
        address: {
          city,
          street,
          houseNumber,
          state,
          pincode,
          country,
        },
        ...otherValues,
      };

      try {
        await axios.post(`${API_URL}/profile/create`, payload, {
          headers: {
            Authorization: localStorage.getItem('Authorization'),
          },
        });

        swal({
          title: 'Welcome!',
          text: 'Your profile has been created successfully',
          icon: 'success',
          button: 'ok!',
        });
        navigate('/profile');
      } catch (error) {
        openSnackbar(error?.response?.data?.message);
      }
    },
  });
  return (
    <div className='mt-3' shadow>
      <div className='card'>
        <div className='card-body p-4 mb-2 bg-body rounded'>
          <h1>Profile Setting</h1>
          <form className='row g-3' onSubmit={formik.handleSubmit}>
            <div className='col-md-6'>
              <label for='name' className='form-label'>
                Name
              </label>
              <input
                type='text'
                className='form-control'
                id='name'
                name='name'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <small style={{ color: 'red' }}>{formik.errors.name}</small>
              ) : null}
            </div>
            <div className='col-md-6'>
              <label for='email' className='form-label'>
                Email
              </label>
              <input
                type='email'
                className='form-control'
                id='email'
                name='email'
                disabled
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <small style={{ color: 'red' }}>{formik.errors.email}</small>
              ) : null}
            </div>
            <div className='col-md-6'>
              <label for='age' className='form-label'>
                Age
              </label>
              <input
                type='number'
                className='form-control'
                id='age'
                min='18'
                name='age'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.age}
              />
              {formik.touched.age && formik.errors.age ? (
                <small style={{ color: 'red' }}>{formik.errors.age}</small>
              ) : null}
            </div>
            <div className='col-md-6'>
              <label for='gender' className='form-label'>
                Gender
              </label>
              <select
                className='form-select'
                aria-label='Select Gender'
                onBlur={formik.handleBlur}
                name='gender'
                onChange={formik.handleChange}
                value={formik.values.gender}>
                <option selected>Select Gender</option>
                <option value='male' name='gender'>
                  Male
                </option>
                <option value='female' name='gender'>
                  Female
                </option>
                <option value='others' name='gender'>
                  Others
                </option>
              </select>
              {formik.touched.gender && formik.errors.gender ? (
                <small style={{ color: 'red' }}>{formik.errors.gender}</small>
              ) : null}
            </div>
            <div className='col-md-6'>
              <label for='dob' className='form-label'>
                DOB
              </label>
              <input
                type='date'
                className='form-control'
                id='dob'
                name='dob'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.dob}
              />
              {formik.touched.dob && formik.errors.dob ? (
                <small style={{ color: 'red' }}>{formik.errors.dob}</small>
              ) : null}
            </div>

            <div className='col-md-6'>
              <label for='mobile' className='form-label'>
                Mobile
              </label>
              <input
                type='number'
                className='form-control'
                id='mobile'
                min='18'
                name='mobile'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.mobile}
              />
              {formik.touched.mobile && formik.errors.mobile ? (
                <small style={{ color: 'red' }}>{formik.errors.mobile}</small>
              ) : null}
            </div>

            <div className='col-md-8'>
              <label for='street' className='form-label'>
                Street
              </label>
              <input
                type='text'
                className='form-control'
                id='street'
                name='street'
                placeholder=' Main St'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.street}
              />
              {formik.touched.street && formik.errors.street ? (
                <small style={{ color: 'red' }}>{formik.errors.street}</small>
              ) : null}
            </div>

            <div className='col-md-4'>
              <label for='houseNo' className='form-label'>
                House No
              </label>
              <input
                type='text'
                className='form-control'
                id='houseNo'
                name='houseNumber'
                placeholder='123/24'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.houseNumber}
              />
              {formik.touched.houseNumber && formik.errors.houseNumber ? (
                <small style={{ color: 'red' }}>
                  {formik.errors.houseNumber}
                </small>
              ) : null}
            </div>

            <div className='col-md-6'>
              <label for='city' className='form-label'>
                City
              </label>
              <input
                type='text'
                className='form-control'
                id='city'
                name='city'
                placeholder='Enter your city'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.city}
              />
              {formik.touched.city && formik.errors.city ? (
                <small style={{ color: 'red' }}>{formik.errors.city}</small>
              ) : null}
            </div>
            <div className='col-md-6'>
              <label for='pincode' className='form-label'>
                Pincode
              </label>
              <input
                type='number'
                className='form-control'
                name='pincode'
                id='pincode'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.pincode}
              />
              {formik.touched.pincode && formik.errors.pincode ? (
                <small style={{ color: 'red' }}>{formik.errors.pincode}</small>
              ) : null}
            </div>

            <div className='col-md-6'>
              <label for='state' className='form-label'>
                State
              </label>
              <input
                type='text'
                className='form-control'
                name='state'
                id='state'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.state}
              />
              {formik.touched.state && formik.errors.state ? (
                <small style={{ color: 'red' }}>{formik.errors.state}</small>
              ) : null}
            </div>

            <div className='col-md-6'>
              <label for='country' className='form-label'>
                Country
              </label>
              <input
                type='text'
                className='form-control'
                name='country'
                id='country'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.country}
              />
              {formik.touched.country && formik.errors.country ? (
                <small style={{ color: 'red' }}>{formik.errors.country}</small>
              ) : null}
            </div>

            <div className='col-md-6 d-flex justify-content-between'>
              <button type='submit' className='btn btn-primary px-4 py-2'>
                SAVE
              </button>
              <Link to='/profile'>
                <button type='button' className='btn btn-info px-4 py-2'>
                  Go to Profile
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileForm;
