import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, Grid, Paper, TextField, Snackbar } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Alert from '@mui/material/Alert';
import { loginAdminAction, resetPasswordAction, setNotificationClose } from "../../redux/action/login";
import './login.css';
import { getItemFromStorage } from "utils/useLocalStorage";

export default function LoginView() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isUserLogin = useMemo(() => getItemFromStorage('isUserLogin'), [])

    const { isError, isLoggedIn, severity, showNotification, message, isLoadingResetPassword, isLoadingAdminLogin } = useSelector(state => state.logInUser)

    const [input, setInput] = useState({
        phoneNumber: "",
        password: ""
    })

    const [wrong, setWrong] = useState(false)

    useEffect(() => {
        setWrong(isError)
    }, [isError])

    useEffect(() => {
        if (isLoggedIn || isUserLogin) {
            navigate('/dashboard')
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps


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
        dispatch(resetPasswordAction({
            phoneNumber: input.phoneNumber
        }))
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

    if (isLoggedIn || isUserLogin) {
        navigate('/dashboard')
        return;
    }

    return (
        <Grid>

            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={showNotification}
                onClose={() => { }}
                key={'top-right'}
            >
                <Alert severity={severity} onClose={handleClose}>{message}</Alert>
            </Snackbar>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatar}><LockOutlinedIcon /></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField label='Phone Number' placeholder="Enter Phone Number" variant="standard" name="phoneNumber" value={input.phoneNumber} onChange={handleChange} fullWidth required />
                <TextField label='Password' placeholder="Enter Password" type='Password' variant="standard" name="password" value={input.password} onChange={handleChange} fullWidth required style={{ marginTop: '10px' }} />
                <div className="reset-button-wrapper">
                    <Tooltip title='Enter phone number to reset password'>
                        <IconButton>
                            <InfoIcon size={10} />
                        </IconButton>
                    </Tooltip>
                    <Button style={resetButton} onClick={handleReset} disabled={!input.phoneNumber.length || isLoadingResetPassword}>Reset password</Button> </div>
                {wrong ? <p style={{ color: 'red' }}>Please enter correct credentials!!!!</p> : ''}
                <Button variant="contained" onClick={handleLoginClick} fullWidth style={{ marginTop: '80px' }} disabled={isDisabledSignIn}>{isLoadingAdminLogin ? <CircularProgress color="inherit" size={20} /> : 'Sign In'}</Button>
            </Paper>
        </Grid>
    );
}