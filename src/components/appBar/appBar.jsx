import React from 'react';
import { AppBar, Toolbar } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuBar from './menuBar';
import { getItemFromStorage } from '../../utils/useLocalStorage';
import { useSelector } from 'react-redux';

export default function SosAppBar() {
    const isUserLogin  = getItemFromStorage('isUserLogin')
    const { isLoggedIn } = useSelector(state => state.logInUser)
    
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return(
        <AppBar position='static'>
            <Toolbar style={{backgroundColor: '#081b30de', width: '100%', display: 'flex'}}>
                <div style={{ display: 'flex', width: '100%'}}>
                <Typography variant='h6' component='div'>
                    SOS HealthCare Guidance Admin Dashboard.
                </Typography>
                </div>
                {(isLoggedIn || isUserLogin) && <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end', paddingRight: '38px'}}>
                <IconButton size='large' edge='end' color='inherit' aria-label='logo'  onClick={handleClick}>
                    <Avatar alt="SOS Health" src="../../assets/icon.svg" />
                </IconButton>
                
                <MenuBar anchorEl={anchorEl} setAnchorEl={setAnchorEl}/>
                </div>}
            </Toolbar>
        </AppBar>
    );
}