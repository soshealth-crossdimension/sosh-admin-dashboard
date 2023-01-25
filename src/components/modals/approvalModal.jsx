import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
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

export default function ApprovalModal({
    approved,
    handleCloseApproveModal,
    serviceProviderId,
    refreshDataAfterAction,
    isUpdateView,
    preApprovedGrade
}) {


    const [grade, setGrade] = React.useState('');
    const [fee, setFee] = React.useState('');
    const [checked, setChecked] = React.useState(true);
    const [deductionRate, setDeductionRate] = React.useState(0);
    const [taxRate, setTaxRate] = React.useState(0);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [error, setError] = React.useState(false);

    useEffect(() => {
        setGrade(preApprovedGrade);
    },[])

    const preparePayloadForGradeUpdate = () => {
        const payload = [{
            op: 'replace',
            path: '/grade',
            value: grade
        }
        ]
        if (!isUpdateView) {
            payload.push({
                op: 'replace',
                path: '/registrationStatus',
                value: 'APPROVED'
            })
        }
        return payload;
    }

    const handleGradeChange = (event) => {
        setGrade(event.target.value);
    }

    const handleDeductionRateChange = (event) => {
        setDeductionRate(event.target.value)
    }

    const handleTaxRateChange = (event) => {
        setTaxRate(event.target.value)
    }

    const handleFeeChange = (event) => {
        setFee(event.target.value);
        if (checked) {
            setChecked(false);
        }
    }

    const apiCalls = async (patchElemet) => {
        await updateServiceProvider(patchElemet, serviceProviderId,);
    }

    const handleCheckChange = (event) => {
        setChecked(event.target.checked);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!checked && fee.length <= 0) {
            setError(true);
            setErrorMessage(
                "Please fill all the fields with proper value"
            );
        } else {
            setError(false);
            //const payload = preparePayloadForPrice();
            const patchElemet = preparePayloadForGradeUpdate();
            await apiCalls(patchElemet);
            handleCloseApproveModal();
            refreshDataAfterAction();  
        }
    }

    const title = isUpdateView ? 'Update' : 'Approval';
    const primaryButtonTitle = isUpdateView ? 'Update' : 'Approve';

    return (
        <Modal
            open={approved}
            onClose={handleCloseApproveModal}
        >
            <Box sx={modalStyles.inputFields}>
                <h3 style={modalStyles.heading}>{title} Form</h3>
                <FormControl fullWidth style={{ marginBottom: '10px' }}>
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
                {!checked && <FormControl fullWidth required >
                    <TextField
                        id="fee"
                        label="Fee"
                        name="fee"
                        value={fee}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleFeeChange}
                        style={{ marginBottom: '5px' }}
                    />
                    <TextField
                        id="deductionRate"
                        label="Deduction Rate"
                        name="fee"
                        value={deductionRate}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleDeductionRateChange}
                        style={{ marginBottom: '5px' }}
                    />
                    <TextField
                        id="taxRate"
                        label="Tax Rate"
                        name="taxRate"
                        value={taxRate}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleTaxRateChange}
                    />
                </FormControl>}
                {/* <FormControlLabel control={<Checkbox checked={checked} onChange={handleCheckChange} />} label="Fees as per Department" fullWidth /> */}
                <FormControlLabel control={<Checkbox checked={true} />} label="Fees as per Department" fullWidth />

                {error ? <p style={{ color: 'red' }}>{errorMessage}</p> : ''}
                <Stack direction="row" spacing={30} style={{ marginTop: '20px' }}>
                    <Button variant="contained" color="success" onClick={handleSubmit}>{primaryButtonTitle}</Button>
                    <Button variant="contained" onClick={handleCloseApproveModal} >Cancel</Button>
                </Stack>
            </Box>
        </Modal>
    );
}
