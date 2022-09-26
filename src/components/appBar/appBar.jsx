import { AppBar, Avatar, IconButton, Toolbar, Typography } from "@mui/material";

export default function SosAppBar() {
    return(
        <AppBar position='static'>
            <Toolbar style={{backgroundColor: '#081b30de'}}>
                <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
                    <Avatar alt="SOS Health" src="../../assets/icon.jpeg" />
                </IconButton>
                <Typography variant='h6' component='div'>
                    SOS HealthCare Guidance
                </Typography>
            </Toolbar>
        </AppBar>
    );
}