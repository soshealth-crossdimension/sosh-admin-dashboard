import React from "react";
import {Chip} from '@mui/material';

export default function EmergencyStatus ({statusValue}) {
    const getChipColor = () =>{
        if (statusValue.toLowerCase() === 'online') 
            return 'success';
        else if (statusValue.toLowerCase() === 'offline') 
            return 'warning';
        else 
            return 'info';
    }
    return (
        <Chip variant="filled" label={statusValue} color={getChipColor()} />
    );
}