import React from "react";
import {Chip} from '@mui/material';

export default function Status ({statusValue}) {
    const getChipColor = () =>{
        if (statusValue.toLowerCase() === 'pending') 
            return 'info';
        else if (statusValue.toLowerCase() === 'accepted')
            return 'success';
        else 
            return 'error';  
    }
    return (
        <Chip variant="filled" label={statusValue} color={getChipColor()} />
    );
}