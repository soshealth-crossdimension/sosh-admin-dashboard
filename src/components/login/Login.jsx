import React from "react";
import { useNavigate } from "react-router-dom";
import {Avatar, Button, Grid, Paper, TextField} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useState } from "react";
import { pass, userName } from "../../config/config";

export default function LoginView () {
    let navigate = useNavigate();

    const [input, setInput] = useState({
        name: "",
        password: ""
    })

    const [wrong, setWrong] = useState(false)

    const handleLoginClick = (e) => {
        e.preventDefault();
        if(input.name === userName && input.password === pass){
            navigate('/dashboard');
        } else {
            setWrong(true);
        }
    }

    const handleChange = (e) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const paperStyle = {padding: 20, height: '70vh', width: 280, margin: '20px auto'}
    const avatar = {backgroundColor: '#1d1bbd'}

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatar}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField label='Username' placeholder="Enter Username" variant="standard" name="name" value={input.name} onChange={handleChange} fullWidth required/>
                <TextField label='Password' placeholder="Enter Password" type='Password' variant="standard" name="password" value={input.password} onChange={handleChange} fullWidth required style={{marginTop: '10px'}}/>
                {wrong ? <p style={{color: 'red'}}>Please enter correct credentials!!!!</p> : ''}
                <Button variant="contained" onClick={handleLoginClick} fullWidth style={{marginTop: '80px'}}>Sign In</Button>
            </Paper>
        </Grid>       
    );
}