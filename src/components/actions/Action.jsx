import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ApprovalModal from '../modals/approvalModal';
import RejectModal from '../modals/rejectedModal';
import PartiallyRejectModal from '../modals/partiallyRejectModal';

const options = [
  'Accept',
  'Reject',
  'Partially Reject'
];

const ITEM_HEIGHT = 48;


export default function ActionMenu ({serviceProviderId}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [approvalModalOpen, setApprovalModalOpen] = React.useState(false);
  const handleApprovalModalOpen = () => setApprovalModalOpen(true);
  
  const [rejectionModalOpen, setRejectionModalOpen] = React.useState(false);
  const handleRejectionModalOpen = () => setRejectionModalOpen(true);
  
  const [partiallyRejectionModalOpen, setPartiallyRejectionModalOpen] = React.useState(false);
  const handlePartiallyRejectionModalOpen = () => setPartiallyRejectionModalOpen(true);
  
  const handleMenuSelection = (event, index) => {
    
    setAnchorEl(null);
    switch(index){
      case 0:
        handleApprovalModalOpen();
        break;
      case 1:
        handleRejectionModalOpen();
        break;
      default:
        handlePartiallyRejectionModalOpen();
        break;
    }

  };



  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option, index) => (
          <MenuItem key={option} selected={index === option} onClick={(event) => handleMenuSelection(event, index)}>
            {option === 'Accept' && <DoneIcon color='success' />}
            {option === 'Reject' && <ClearIcon color='error' />}
            {option === 'Partially Reject' && <WarningAmberIcon color='warning' />}
            {option}
          </MenuItem>
        ))}
      </Menu>
      {approvalModalOpen ? <ApprovalModal approved={approvalModalOpen} handleCloseApproveModal={() => setApprovalModalOpen(false)} serviceProviderId={serviceProviderId}/> : ''}
      {rejectionModalOpen ? <RejectModal rejected={rejectionModalOpen} handleCloseRejectModal={() => setRejectionModalOpen(false)}/> : ''}
      {partiallyRejectionModalOpen ? <PartiallyRejectModal partially={partiallyRejectionModalOpen} handleClosePartialModal={() => setPartiallyRejectionModalOpen(false)}/> : ''}      
    </div>
  );
}
