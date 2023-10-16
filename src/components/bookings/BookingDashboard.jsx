import React, { useState, useEffect } from 'react';
// import { useNavigate } from "react-router-dom";
import { Box, Container } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Status from '../status/Status';
//import Download from '../downloads/Download';
import CircularColor from '../loader/Loading';
import Checkbox from './customcheckbox';
import {dateFormat} from '../../utils/dateFormat'
import { getAllBookingDetails, cancelBookings } from '../../api/booking-management/bookingMgmt';
import ContentWithHover from '../ContentWithHover';
import './BookingDashboard.css';

export default function BookingDashboardView() {
  // let navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [selectedBookingsIds, setSelectedBookingIds] = useState([])
  const [openAlert,setOpenAlert] = useState(false)
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
    field: 'patientDetails.age',
    headerName: 'Age (Patient)',
    width: 120,
    editable: false,
    valueGetter: (params) =>
    `${params.row.patientDetails.age || ''} years`,
  },
  {
    field: 'serviceAddress',
    headerName: 'Location (Patient)',
    width: 300,
    editable: false,
    renderCell: (params) => (
      <ContentWithHover value={params.row?.serviceAddress}>
        <div className='service-address-layout'>{params.row?.serviceAddress || ''}</div>
      </ContentWithHover>)
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
];

const handleCancelBookings = async() => {
  try {
    const res = await cancelBookings({
      bookingStatus:'ADMIN_CANCELLED',
      bookingIds: selectedBookingsIds.join(',')
    });

    if(res) {
      setSelectedBookingIds([]);
      fetchData()
    }
} catch(error) {
  setOpenAlert(true);
  }
}

  const handleClose = () => {
    setOpenAlert(false)
  }

  return (
    <>
    <div style={{ padding: "30px", paddingBottom: 0 }}>
     <Typography variant="h4" gutterBottom>
       All Bookings
      </Typography>
      </div>
      <Snackbar
        anchorOrigin={{  vertical: 'top',horizontal: 'right', }}
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Something went wrong!
        </Alert>
      </Snackbar>
     {isPending ? <Container>
       <CircularColor/>
      </Container> :
      <Box sx={{ height: 700, width: '100%', padding: '0 20px' }}>
        <div style={{ display: 'flex', flexDirection: 'row-reverse', padding: '0 10px 10px'}}>
          <Button
            variant="outlined"
            onClick={handleCancelBookings}
            disabled={!selectedBookingsIds.length}
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
        selectionModel={selectedBookingsIds}
        checkboxSelection
        onSelectionModelChange={(idsValue) => { setSelectedBookingIds(idsValue)}}
        experimentalFeatures={{ newEditingApi: true }}
        components={{
          BaseCheckbox: Checkbox,
          Toolbar: GridToolbar
        }}
      />}
    </Box>}
    {/* {!isPending && <Button variant="contained" sx={{ marginLeft:"85rem" }} onClick={handleAllDoctor}>All Docotrs</Button>} */}
    </>
    
  );
}
