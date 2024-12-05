import { useEffect, useState } from 'react';
import { Typography, Container, Paper, Snackbar, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import { addHrDetails, editHrDetails } from '@/services/employeeService';
import HrDetailsForm from '../hrDetailsForm';
import { AddEditHrDetailFormProps } from '../constants';


export default function AddEditHrDetailsPage({ initialData,allClients }: AddEditHrDetailFormProps) {
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('')
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success')
    const [editFlag, setEditFlag] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (data: EmployeeHrDetails) => {
        try {
            const response = editFlag ? await editHrDetails(data) : await addHrDetails(data);
            setIsLoading(false);
            if (response.ok) {
                setSnackbarMessage(`HR details ${editFlag ? "updated" : "added"} successfully`)
                setSnackbarSeverity('success')
                setOpenSnackbar(true)
                router.push(`/employee/employee/view-employee/${data.employeeId}`)
            } else {
                setSnackbarMessage(`Failed to ${editFlag ? "updated" : "added"} HR details. Please try again.`)
                setSnackbarSeverity('error')
                setOpenSnackbar(true)
            }
        } catch (error) {
            console.error(`Error ${editFlag ? "updating" : "adding"} HR details.`, error);
            setSnackbarMessage(`Failed to ${editFlag ? "update" : "add"} HR details. ${error}`)
            setSnackbarSeverity('error')
            setOpenSnackbar(true)
        }
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    useEffect(() => {
        console.log('initialData:', JSON.stringify(initialData));
        if (initialData && initialData?.id && initialData?.id > 0) {
            setEditFlag(true);
        }
    }, [initialData]);

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                <HrDetailsForm onSubmit={handleSubmit}
                    isEditing={false}
                    allClients={allClients}
                    initialData={initialData} />
            </Paper>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose}
                    severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
}


