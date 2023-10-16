import React from "react";
import {IconButton} from '@mui/material';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { getDownloadedFiles } from "../../api/admin-management/adminMgmt";




export default function Download({serviceProviderId}) {
    const handleClick = async () => {
        await getDownloadedFiles(serviceProviderId);
    }

    return (
        <IconButton variant="contained" onClick={handleClick}><DownloadForOfflineIcon color="success"/></IconButton>
    );
}