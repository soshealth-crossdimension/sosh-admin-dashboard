import React, { useState, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import ActionMenu from '../actions/Action';
import Status from '../status/Status';
import Download from '../downloads/Download';
import CircularColor from '../loader/Loading';
import { getServiceProviderPendingApproval } from '../../api/data-management/serviceProvider';

const columns = [
  { field: 'id', headerName: 'ID', width: 250 },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 250,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.middleName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: 'gender',
    headerName: 'Sex',
    width: 200,
    editable: false,
  },
  {
    field: 'serviceExperience',
    headerName: 'Experience',
    width: 160,
    editable: false,
  },
  {
    field: 'registrationStatus',
    headerName: 'Status',
    width: 170,
    renderCell: (params) => {
      return <Status statusValue={params.row.registrationStatus} />;
    }
  },
  {
    field: 'documents',
    headerName: 'Documents',
    width: 100,
    renderCell: (params) => {
      return <Download serviceProviderId={params.row.id}/>
    }
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 90,
    renderCell: (params) => {
      return <ActionMenu serviceProviderId={params.row.id}/>
    }
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
    <>
     {isPending ? <Container>
       <CircularColor/>
      </Container> :
      <Box sx={{ height: 700, width: '100%' }}>
      {!isPending && <DataGrid
        rows={data}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />}
    </Box>}
    </>
    
  );
}
