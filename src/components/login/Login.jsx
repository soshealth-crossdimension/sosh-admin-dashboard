import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, Grid, Paper, TextField, Snackbar, InputAdornment } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Alert from '@mui/material/Alert';
import { loginAdminAction, resetPasswordAction, setNotificationClose, validAdminAction } from "../../redux/action/login";
import './login.css';
import { getItemFromStorage } from "utils/useLocalStorage";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function LoginView() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isError, isLoggedIn, severity, showNotification, message, isLoadingResetPassword, isLoadingAdminLogin, isValidAdmin } = useSelector(state => state.logInUser)

    const [input, setInput] = useState({
        phoneNumber: "",
        password: ""
    })

    const [wrong, setWrong] = useState(false)

    const [showPassword, setShowPassword] = useState(false);

    const handleShowPasswordClick = () => {
        setShowPassword(!showPassword);
    }

    useEffect(() => {
        setWrong(isError)
    }, [isError])

    useEffect(() => {
       const isUserLogin = getItemFromStorage('isUserLogin')
        if ((isLoggedIn || isUserLogin) && !isLoadingAdminLogin) {
            navigate('/dashboard')
        } else if (isValidAdmin && !isLoadingResetPassword){
            navigate('/reset');
        }
    }, [isLoggedIn, isLoadingAdminLogin, isValidAdmin, isLoadingResetPassword]) // eslint-disable-line react-hooks/exhaustive-deps


    const handleLoginClick = (e) => {
        e.preventDefault();
        dispatch(loginAdminAction({
            requestPayload: {
                phone: input.phoneNumber,
                password: input.password
            },
        }))
    }

    const handleChange = (e) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleReset = () => {
        dispatch(validAdminAction({
            requestPayload: {
                phoneNumber: input.phoneNumber
            },
        }));
    }

    const handleClose = () => {
        dispatch(setNotificationClose());
    }

    const paperStyle = { padding: 20, height: '70vh', width: 280, margin: '20px auto' }
    const avatar = { backgroundColor: '#1d1bbd' }
    const resetButton = {
        fontSize: 'small',
        fontWeight: 400,
        fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
    }

    const isDisabledSignIn = !(input.phoneNumber && input.password) || (isLoadingResetPassword || isLoadingAdminLogin)

    return (
        <Grid>

            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={showNotification}
                onClose={() => { }}
                key={'top-right'}
                autoHideDuration={6000}
            >
                <Alert severity={severity} onClose={handleClose}>{message}</Alert>
            </Snackbar>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatar}><LockOutlinedIcon /></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField label='Phone Number' placeholder="Enter Phone Number" variant="standard" name="phoneNumber" value={input.phoneNumber} onChange={handleChange} fullWidth required />
                <TextField label='Password' placeholder="Enter Password" type={showPassword ? "text" : "password"} 
                    variant="standard" name="password" value={input.password} onChange={handleChange} 
                    fullWidth required style={{ marginTop: '10px' }} 
                    InputProps={{ 
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleShowPasswordClick}
                            >
                              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                />
                <div className="reset-button-wrapper">
                    <Tooltip title='Enter phone number to reset password'>
                        <IconButton>
                            <InfoIcon size={10} />
                        </IconButton>
                    </Tooltip>
                    <Button style={resetButton} onClick={handleReset} disabled={!input.phoneNumber.length || isLoadingResetPassword}>Reset password 
                    {isLoadingResetPassword ? 
                    <CircularProgress color="inherit" size={20} />
                     : ''}
                    </Button>
                </div>
                {wrong ? <p style={{ color: 'red' }}>Please enter correct credentials!!!!</p> : ''}
                <Button variant="contained" onClick={handleLoginClick} fullWidth style={{ marginTop: '80px' }} disabled={isDisabledSignIn}>{isLoadingAdminLogin ? <CircularProgress color="inherit" size={20} /> : 'Sign In'}</Button>
            </Paper>
        </Grid>
    );
}