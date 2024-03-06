// OTPEntry.js

import React, { useEffect, useState } from 'react';
import './otpScreen.css'; // Import the CSS file
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, CircularProgress } from '@mui/material';
import { fetchOtpAction, otpValidationAction } from '../../redux/action/resetPassword';
import {newDateFormat} from '../../utils/dateFormat'

function OTPEntry() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoadingOtp, isInvalidValidOtp, isValidOtp } = useSelector(state => state.resetPassword || {})
  const { phoneNumber } = useSelector(state => state.logInUser || {})
  const [otp, setOTP] = useState('');

  useEffect(() => {
    if(!phoneNumber) {
      navigate('/');
    }
    // eslint-disable-next-line
  }, [phoneNumber])
  const handleOTPChange = (e) => {
    setOTP(e.target.value);
  };

  const handleSubmit = (e,otp) => {
    e.preventDefault();
    dispatch(otpValidationAction({
      from: phoneNumber,
      otp,
      incomingTimestamp: newDateFormat(new Date()),
      deviceId: ''
    }))
  };

  const handleResendOtp = () => {
    dispatch(fetchOtpAction({
      to: phoneNumber,
      message: "OTP for Login in SOS-Health Care is -",
    }))
  }

  if(isValidOtp && !isLoadingOtp) {
    navigate('/reset-password')
  }

  return (
    <div className='reset-wrapper'>
    <div className="otp-container">
      <h2>Enter OTP</h2>
      <Typography variant="subtitle2" gutterBottom>OTP send to your number <string>{phoneNumber}</string></Typography>
        <TextField label='Enter OTP' placeholder="Confirm Password" type={"text"}
          value={otp} onChange={handleOTPChange}
          fullWidth required style={{ marginTop: '10px' }}
        />
        <div className='reset-otp-wrapper'>
          <Button
            onClick={handleResendOtp}
            disabled={isLoadingOtp}
          >
            Resend OTP
          </Button>
        </div>
        {isInvalidValidOtp &&
         <Typography variant="subtitle2" gutterBottom className='invalid-error-message'>OTP is invalid</Typography>
         }
        <Button
          variant="contained"
          onClick={(e) => handleSubmit(e, otp)}
          fullWidth
          style={{ marginTop: '40px' }}
          disabled={isLoadingOtp}
        >
          {isLoadingOtp ?
            <CircularProgress color="inherit" size={20} /> :
            'Submit OTP'
          }
        </Button>

    </div>
    </div>
  );
}

export default OTPEntry;
