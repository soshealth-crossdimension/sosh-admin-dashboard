import React from "react";
import { useNavigate } from "react-router-dom";
import {Button} from '@mui/material';

export default function LoginView () {
    let navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/dashboard');
    }

    return (
        <>
         <h1>This is a login page</h1>
        <Button variant="contained" onClick={handleLoginClick}>Login</Button>
        </>
       
    );
}