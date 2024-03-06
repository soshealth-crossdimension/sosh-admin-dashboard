import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import CircleCheckedFilled from "@mui/icons-material/CheckCircle";
import CircleUnchecked from "@mui/icons-material/RadioButtonUnchecked";

const CustomCheckbox = (props) => {
    
    const title = props.disabled ? 'You can only cancel the bookings of "Confirmed" status' : 'Please select to cancel this booking'

    return (
        <Tooltip title={title}>
            <span>
            <Checkbox
                icon={<CircleUnchecked />}
                checkedIcon={<CircleCheckedFilled />}
                {...props}/>
            </span>
        </Tooltip>

    )
}

export default CustomCheckbox;