import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, FormControl, Stack, TextField } from '@mui/material';
import { updateServiceProvider } from '../../api/data-management/serviceProvider';

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

export default function RejectModal({rejected, handleCloseRejectModal, serviceProviderId, refreshDataAfterAction}) {
    const [comment, setComment] = React.useState('');
    const handleCommentChange = (event) => {
        setComment(event.target.value);
    }

    const [errorMessage, setErrorMessage] = React.useState("");
    const [error, setError] = React.useState(false);

    const preparePayloadForRejection = () => {
        const payload = [{
            op: 'replace',
            path: '/registrationStatus',
            value: 'REJECTED'
        }
        ]
        return payload;
    }

    const apiCalls = async (patchElemet) => {
        await updateServiceProvider(patchElemet, serviceProviderId,);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (comment.length <= 0) {
            setError(true);
            setErrorMessage(
              "Please put your comments"
            );
        } else {
            const patchElemet = preparePayloadForRejection();
            await apiCalls(patchElemet);
            setError(false);
            console.log('Comment: ', comment);
            handleCloseRejectModal();
            refreshDataAfterAction();
        }
    }

  return (
    <Modal
        open={rejected}
        onClose={handleCloseRejectModal}
      >
        <Box sx={modalStyles.inputFields}>
            <h3 style={modalStyles.heading}>Rejection Form</h3>
            <FormControl fullWidth>
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
