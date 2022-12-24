/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { API_URL } from '../Global';

import {
  profileStart,
  profileSuccess,
  profileFailure,
} from '../redux/slice/profileSlice';

function ProfilePage() {
  const profile = useSelector((state) => state?.profile?.currentprofile);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMove = () => {
    navigate('/');
  };

  const getProfile = async () => {
    dispatch(profileStart());
    try {
      const res = await axios.get(
        `${API_URL}/profile/getprofile`,

        {
          headers: {
            Authorization: localStorage.getItem('Authorization'),
          },
        }
      );
      dispatch(profileSuccess(res?.data));
    } catch (error) {
      dispatch(profileFailure());
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (!profile?.creator) {
    return (
      <>
        <div className='text-center fs-3'>
          Profile not created yet. Go to home page and create it
          <Link to={`/`}>
            <button
              type='button'
              className='btn btn-primary px-5 fw-bold text-center'>
              Go Back
            </button>
          </Link>
        </div>
      </>
    );
  }

  return (
    <div className='container col-lg-6 mx-auto shadow mb-2 bg-body rounded p-3 mt-2 '>
      <h2 className='mt-4'>Profile Page</h2>
      <form className='row g-3 mt-2'>
        <div className='col-md-6'>
          <label for='name' className='form-label fs-5'>
            Name
          </label>
          <h5>{profile?.name}</h5>
        </div>
        <div className='col-md-6'>
          <label for='email' className='form-label' fs-5>
            Email
          </label>
          <h5>{profile?.email}</h5>
        </div>
        <div className='col-md-6'>
          <label for='age' className='form-label' fs-5>
            Age
          </label>
          <h5>{profile?.age}</h5>
        </div>
        <div className='col-md-6'>
          <label for='gender' className='form-label' fs-5>
            Gender
          </label>
          <h5>{profile?.gender}</h5>
        </div>
        <div className='col-md-6'>
          <label for='dob' className='form-label' fs-5>
            DOB
          </label>

          <h5>{profile?.dob}</h5>
        </div>

        <div className='col-md-6'>
          <label for='mobile' className='form-label' fs-5>
            Mobile
          </label>
          <h5>{profile?.mobile}</h5>
        </div>

        <div className='col-md-6'>
          <label for='houseNo' className='form-label' fs-5>
            House No
          </label>
          <h5>{profile?.houseNumber}</h5>
        </div>

        <div className='col-md-6'>
          <label for='street' className='form-label' fs-5>
            Street
          </label>
          <h5>{profile?.street}</h5>
        </div>

        <div className='col-md-6'>
          <label for='city' className='form-label' fs-5>
            City
          </label>
          <h5>{profile?.city}</h5>
        </div>
        <div className='col-md-6'>
          <label for='pincode' className='form-label' fs-5>
            Pincode
          </label>
          <h5>{profile?.pincode}</h5>
        </div>

        <div className='col-md-6'>
          <label for='state' className='form-label' fs-5>
            State
          </label>
          <h5>{profile?.state}</h5>
        </div>

        <div className='col-md-6'>
          <label for='country' className='form-label' fs-5>
            Country
          </label>
          <h5>{profile?.country}</h5>
        </div>

        <div className='d-flex justify-content-around'>
          <Link to={`/edit/${profile?._id}`}>
            <button type='submit' className='btn btn-primary px-5 fw-bold'>
              Edit
            </button>
          </Link>
          <button
            type='submit'
            className='btn btn-info fw-bold'
            onClick={handleMove}>
            Back to Home
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfilePage;
