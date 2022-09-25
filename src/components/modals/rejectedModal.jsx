import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, FormControl, Stack, TextField } from '@mui/material';

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

export default function RejectModal({rejected, handleCloseRejectModal}) {
    const [comment, setComment] = React.useState('');
    const handleCommentChange = (event) => {
        setComment(event.target.value);
    }

    const [errorMessage, setErrorMessage] = React.useState("");
    const [error, setError] = React.useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (comment.length <= 0) {
            setError(true);
            setErrorMessage(
              "Please put your comments"
            );
        } else {
            setError(false);
            console.log('Comment: ', comment);
        }
    }

  return (
    <Modal
        open={rejected}
        onClose={handleCloseRejectModal}
      >
        <Box sx={modalStyles.inputFields}>
            <h3 style={modalStyles.heading}>Rejection Form</h3>
            <FormControl fullWidth required>
                <TextField
                    id="comment"
                    label="Rejection Comment"
                    name="comment"
                    value={comment}
                    onChange={handleCommentChange}
                />
            </FormControl>
            {error ? <p style={{color: 'red'}}>{errorMessage}</p> : ''}
            <Stack direction="row" spacing={30} style={{marginTop: '20px'}}>
                <Button variant="contained" color="error" onClick={handleSubmit}>Reject</Button>
                <Button variant="contained" onClick={handleCloseRejectModal} >Cancel</Button>
            </Stack>
        </Box>
      </Modal>
  );
}
