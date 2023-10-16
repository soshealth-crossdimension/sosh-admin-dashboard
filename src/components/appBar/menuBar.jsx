import React from 'react';
import { useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Book from '@mui/icons-material/Book';
import Person from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import ServiceProvider from '@mui/icons-material/RunCircle';
import { removeItemFromStorage } from '../../utils/useLocalStorage';
import { resetDataAction } from 'redux/action/login';
import { useDispatch } from 'react-redux';


export default function MenuBar({ anchorEl, setAnchorEl }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const open = Boolean(anchorEl);
    
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleLogout = () => {
      removeItemFromStorage('isUserLogin');
      dispatch(resetDataAction())
      navigate('/')
    }

    return(
                <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => navigate('/bookings')}>
          <Book fontSize="medium" style={{ paddingRight: '4px'}}/> Bookings
        </MenuItem>
        <MenuItem onClick={() => navigate('/customer')}>
          <Person fontSize="medium" style={{ paddingRight: '4px'}}/> Customer
        </MenuItem>
        <MenuItem onClick={() => navigate('/dashboard')}>
          <ServiceProvider fontSize="medium" style={{ paddingRight: '4px'}}/> Service Provider
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <LogoutIcon fontSize="medium" style={{ paddingRight: '4px'}}/> Log out
        </MenuItem>
      </Menu>
    );
}