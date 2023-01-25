import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Box, Container, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import Status from '../status/Status';
//import Download from '../downloads/Download';
import CircularColor from '../loader/Loading';
import Checkbox from './customcheckbox';
import {dateFormat} from '../../utils/dateFormat'
import { getAllBookingDetails } from '../../api/booking-management/bookingMgmt';

export default function BookingDashboardView() {
  // let navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  
  const fetchData = async () => {
    const res = await getAllBookingDetails();
    setData(res);
    setIsPending(false);
  }

  useEffect(() => {
      fetchData();
 }, []);

//  const handleAction = () => {
//   fetchData()
//  }

 const columns = [
  { field: 'id', headerName: 'ID', width: 150 },
  {
    field: 'bookingDate',
    headerName: 'Booking Date',
    width: 200,
    editable: false,
    valueGetter: (params) =>
    `${params.row.bookingDate ? dateFormat(new Date(params.row.bookingDate)) : 'NA'}` },
  
  {
    field: 'customer.fullName',
    headerName: 'Customer Name',
    width: 200,
    editable: false,
    valueGetter: (params) =>
    `${params.row.customer.fullName || ''}`
  },
  {
    field: 'customer.Mobile',
    headerName: 'Customer Number',
    width: 180,
    editable: false,
    valueGetter: (params) =>
    `${params.row.customer.mobile || ''}`
  },
  {
    field: 'patientDetails.fullName',
    headerName: 'Patient Name',
    width: 200,
    editable: false,
    valueGetter: (params) =>
    `${params.row.patientDetails.firstName || ''} ${params.row.patientDetails.middleName || ''} ${params.row.patientDetails.lastName || ''}`,
  },
  {
    field: 'patientDetails.sex',
    headerName: 'Gender (Patient)',
    width: 120,
    editable: false,
    valueGetter: (params) =>
    `${params.row.patientDetails.sex || ''}`,
  },
  {
    field: 'serviceProvider.fullName',
    headerName: 'Service Provider',
    description: 'Service provider Full name',
    sortable: false,
    width: 200,
    valueGetter: (params) =>
      `${params.row.serviceProvider.fullName || ''}`,
  },
  {
    field: 'serviceProvider.mobile',
    headerName: 'Service Provider Number',
    width: 180,
    editable: false,
    valueGetter: (params) =>
    `${params.row.serviceProvider.mobile || ''}`,
  },
  {
    field: 'bookingStatus',
    headerName: 'Booking Status',
    width: 150,
    renderCell: (params) => {
    console.log(params.row.bookingStatus, 'params.row.bookingStatus---')
      return <Status statusValue={params.row.bookingStatus} />;
    }
  },
  {
    field: 'paymentDetails.paymentMode',
    headerName: 'Payment Mode',
    width: 150,
    valueGetter: (params) =>
    `${params.row.paymentDetails?.paymentMode || ''}`
  },
  // {
  //   field: 'feeDetails',
  //   headerName: 'Fees',
  //   width: 120,
  //   valueGetter: (params) =>
  //   `${params.row.feeDetails || ''}`
  // },
  // {
  //   field: 'documents',
  //   headerName: 'Documents',
  //   width: 100,
  //   renderCell: (params) => {
  //     return <Download serviceProviderId={params.row.id}/>
  //   }
  // },
//   {
//     field: 'actions',
//     headerName: 'Actions',
//     width: 90,
//     renderCell: (params) => {
//       return <ActionMenu serviceProviderId={params.row.id} onClick={handleAction}/>
//     }
// }

];

  const handleCancelBookings = () => {
    console.log('cancel booking----')
  }

  return (
    <>
    <div style={{ padding: "30px", paddingBottom: 0 }}>
     <Typography variant="h4" gutterBottom>
       All Bookings
      </Typography>
      </div>
     {isPending ? <Container>
       <CircularColor/>
      </Container> :
      <Box sx={{ height: 700, width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'row-reverse', padding: '0 10px 10px'}}>
          <Button
            variant="outlined"
            onClick={handleCancelBookings}
            >
              Cancel Bookings
            </Button>
        </div>
      {!isPending && <DataGrid
        rows={data}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        isRowSelectable={(params) => params.row.bookingStatus === 'CONFIRMED'}
        checkboxSelection
        onSelectionModelChange={(e) => console.log(e, 'triger row')}
        experimentalFeatures={{ newEditingApi: true }}
        components={{
          BaseCheckbox: Checkbox
        }}
      />}
    </Box>}
    {/* {!isPending && <Button variant="contained" sx={{ marginLeft:"85rem" }} onClick={handleAllDoctor}>All Docotrs</Button>} */}
    </>
    
  );
}
