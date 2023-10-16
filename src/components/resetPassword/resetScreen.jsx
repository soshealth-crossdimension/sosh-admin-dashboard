// PasswordReset.js

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, CircularProgress } from '@mui/material';
import { resetPassword, resetDataPasswordAction } from '../../redux/action/resetPassword';
import { resetDataAction } from '../../redux/action/login';

import './otpScreen.css'
// Import the CSS file

function PasswordReset() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [invalidErrorMessage, setInvalidErrorMessage] = useState('');

    const { isLoadingResetPassword, isResetSuccess } = useSelector(state => state.resetPassword)
    const { phoneNumber } = useSelector(state => state.logInUser);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const validatePasswords = () => {
        const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])(?=.{8,})/;
        // Check if the input matches the password pattern
        if (!passwordPattern.test(password)) {
            setInvalidErrorMessage('Password must contain 1 uppercase letter, 1 lowercase letter, 1 digit, 1 special character, and be at least 8 characters long.')
            return false
        } else if (password !== confirmPassword) {
            setInvalidErrorMessage('Confirm password should be same as new password')
            return false
        }
        setInvalidErrorMessage('')
        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Redirect or show a success message after resetting the password
        const isValid = validatePasswords()
        if (isValid) {
            dispatch(resetPassword({
                phoneNumber,
                newPassword: password,
                confirmPassword
            }))
        }
    };

    if (isResetSuccess) {
        dispatch(resetDataAction())
        dispatch(resetDataPasswordAction())
        navigate('/')
    }

    return (
        <div className="reset-wrapper">
            <div className="otp-container">
                <h2>Reset Password</h2>
                {invalidErrorMessage && <span className="invalid-password">{invalidErrorMessage}</span>}

                <Typography sx={{ p: 2 }}>
                    Password must contain at least:
                    <br />
                    - 1 uppercase letter
                    <br />
                    - 1 lowercase letter
                    <br />
                    - 1 digit
                    <br />
                    - 1 special character
                    <br />
                    - Be at least 8 characters long
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField label='New Password' placeholder="New Password" type={"password"}
                        value={password} onChange={handlePasswordChange}
                        fullWidth required style={{ margin: '10px 0' }}
                    />
                    <TextField label='Confirm Password' placeholder="Confirm Password" type={"password"}
                        value={confirmPassword} onChange={handleConfirmPasswordChange}
                        fullWidth required style={{ marginTop: '10px' }}
                    />
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        fullWidth
                        style={{ marginTop: '40px' }}
                        disabled={isLoadingResetPassword}
                    >
                        {isLoadingResetPassword ?
                            <CircularProgress color="inherit" size={20} /> :
                            'Reset Password'
                        }
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default PasswordReset;
