import * as React from 'react';
import {Box} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import ActionMenu from '../actions/Action';
import Status from '../status/Status';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: false,
  },
  {
    field: 'middleName',
    headerName: 'Middle name',
    width: 150,
    editable: false,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: false,
  },
  {
    field: 'gender',
    headerName: 'Sex',
    width: 150,
    editable: false,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: false,
  },
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
      field: 'registrationStatus',
      headerName: 'Status',
      width: 160,
      renderCell: (params) => {
        return <Status statusValue={params.row.status} />;
      }
  },
  {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: () => {
        return <ActionMenu />
      }
  }
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, status: 'PENDING' },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, status: 'ACCEPTED' },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, status: 'PENDING' },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, status: 'REJECTED' },
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, status: 'REJECTED' },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, status: 'REJECTED' },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, status: 'ACCEPTED' },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, status: 'PENDING' }
];

export default function DashboardView() {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}
