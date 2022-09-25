import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import ActionMenu from '../actions/Action';
import Status from '../status/Status';
import { getServiceProviderPendingApproval } from '../../api/data-management/serviceProvider';

const columns = [
  { field: 'id', headerName: 'ID', width: 230 },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.middleName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: 'gender',
    headerName: 'Sex',
    width: 150,
    editable: false,
  },
  {
    field: 'serviceExperience',
    headerName: 'Experience',
    width: 110,
    editable: false,
  },
  {
    field: 'registrationStatus',
    headerName: 'Status',
    width: 160,
    renderCell: (params) => {
      return <Status statusValue={params.row.registrationStatus} />;
    }
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 120,
    renderCell: (params) => {
      return <ActionMenu serviceProviderId={params.row.id}/>
    }
  },
  {
    field: 'documents'
  }
];



export default function DashboardView() {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  useEffect(() => {
    const fetchData = async() => {
      const res = await getServiceProviderPendingApproval()
      setData(res);
      setIsPending(false);
      }
      fetchData();
 }, []);

  return (
    <Box sx={{ height: 700, width: '100%' }}>
      {!isPending && <DataGrid
        rows={data}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />}
    </Box>
  );
}
