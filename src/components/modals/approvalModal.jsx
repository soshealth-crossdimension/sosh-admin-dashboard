import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';

const modalStyles = {
    inputFields: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    },
    heading: {
        display: 'flex',
        justifyContent: 'center'
    }
};

export default function ApprovalModal() {
    const [approvalModalOpen, setApprovalModalOpen] = React.useState(true);
    const handleApprovalModalClose = (event, reason) => {
        if(reason !== 'backdropClick')
            setApprovalModalOpen(false);
    }

    const [grade, setGrade] = React.useState('');
    const handleGradeChange = (event) => {
        setGrade(event.target.value);
    }

    const [fee, setFee] = React.useState(0);
    const handleFeeChange = (event) => {
        setFee(event.target.value);
        if(checked){
            setChecked(false);
        }
    }

    const [checked, setChecked] = React.useState(false);
    const handleCheckChange = (event) => {
        setChecked(event.target.checked);
        if(event.target.checked){
            setFee('500');
        }
    };

    const [errorMessage, setErrorMessage] = React.useState("");
    const [error, setError] = React.useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (grade.length <= 0 || fee <= 0) {
            setError(true);
            setErrorMessage(
              "Please fill all the fields with proper value"
            );
        } else {
            setError(false);
            console.log('Grade: ', grade, ', Fee: ', fee);
        }
    }

  return (
    <Modal
        open={approvalModalOpen}
        onClose={handleApprovalModalClose}
      >
        <Box sx={modalStyles.inputFields}>
            <h3 style={modalStyles.heading}>Approval Form</h3>
            <FormControl fullWidth required style={{marginBottom: '10px'}}>
                <InputLabel>Grade</InputLabel>
                <Select
                    labelId="grade-label"
                    id="grade-select"
                    value={grade}
                    name="grade"
                    label="Grade"
                    onChange={handleGradeChange}
                >
                    <MenuItem value={1}>First</MenuItem>
                    <MenuItem value={2}>Second</MenuItem>
                    <MenuItem value={3}>Third</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth required>
                <TextField
                    id="fee"
                    label="Fee"
                    type="number"
                    name="fee"
                    value={fee}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={handleFeeChange}
                />
            </FormControl>
            <FormControlLabel control={<Checkbox checked={checked} onChange={handleCheckChange} />} label="Fees as per Department" fullWidth />
            {error ? <p style={{color: 'red'}}>{errorMessage}</p> : ''}
            <Stack direction="row" spacing={30} style={{marginTop: '20px'}}>
                <Button variant="contained" color="success" onClick={handleSubmit}>Approve</Button>
                <Button variant="contained" onClick={handleApprovalModalClose} >Cancel</Button>
            </Stack>
        </Box>
      </Modal>
  );
}
