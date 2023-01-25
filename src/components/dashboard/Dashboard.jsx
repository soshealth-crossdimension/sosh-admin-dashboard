import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Box, Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import ActionMenu from '../actions/Action';
import Status from '../status/Status';
//import Download from '../downloads/Download';
import CircularColor from '../loader/Loading';
import {enableActionStatuses} from '../../config/config';
import { fetchServiceProviderListAction } from '../../redux/action/serviceProvider';

export default function DashboardView({approvalBoard}) {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);

  const { serviceProviderList } = useSelector(state => state.serviceProvider)
  
  const fetchData = async () => {
    dispatch(fetchServiceProviderListAction())
  }

  useEffect(() => {
      fetchData();
 }, []);

 useEffect(() => {
  setData(serviceProviderList);
  setIsPending(false);
 }, [serviceProviderList])

 const handleAction = () => {
  fetchData()
 }

//  const handleAllDoctor = () => {
//    navigate('/doctors');
//  }

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
    field: 'contact.mobile',
    headerName: 'Phone Number',
    width: 160,
    editable: false,
    valueGetter: (params) =>
    `${params.row.contact.mobile || ''}`,
},
  {
    field: 'registrationStatus',
    headerName: 'Status',
    width: 170,
    renderCell: (params) => {
      return <Status statusValue={params.row.registrationStatus} />;
    }
  },
  // {
  //   field: 'documents',
  //   headerName: 'Documents',
  //   width: 100,
  //   renderCell: (params) => {
  //     return <Download serviceProviderId={params.row.id}/>
  //   }
  // },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 90,
    renderCell: (params) => {
      const isDisableAction = !enableActionStatuses.includes(params.row.registrationStatus);
      console.log(params, 'params-------------')
      return <ActionMenu
      serviceProviderId={params.row.id}
      onClick={handleAction}
      isDisableAction={isDisableAction}
      isUpdateView={params.row.registrationStatus === 'APPROVED'}
      preApprovedGrade={params.row.grade}
      />
    }
  }
];

  return (
    <>
      <div style={{ padding: "30px"}}>
     <Typography variant="h4" gutterBottom>
       All Service Providers
      </Typography>
      </div>
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
    {/* {!isPending && <Button variant="contained" sx={{ marginLeft:"85rem" }} onClick={handleAllDoctor}>All Docotrs</Button>} */}
    </>
    
  );
}
