import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getAllCustomer } from 'api/data-management/customer';

export default function CustomerDashboardView() {
    const [data, setData] = useState([]);
    const fetchData = async () => {
        const res = await getAllCustomer();
        setData(res);
    }

    useEffect(() => {
        fetchData();
    }, []);


    const columns = [
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 350,
            valueGetter: (params) =>
                `${params.row.firstName || ''} ${params.row.middleName || ''} ${params.row.lastName || ''}`,
        },
        { field: 'createdDate', headerName: 'Registration Date', width: 350 },
        {
            field: 'contact.mobile',
            headerName: 'Phone Number',
            width: 300,
            editable: false,
            valueGetter: (params) =>
                `${params.row.contact.mobile || ''}`,
        }
    ];

    return (
        <>
            <div style={{ padding: "30px" }}>
                <Typography variant="h4" gutterBottom>
                    All Customers
                </Typography>
            </div>
            <Box sx={{ height: 700, width: '80%' }} m="auto">
                <DataGrid
                    rows={data}
                    columns={columns}
                    pageSize={20}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
        </>

    );
}
 