import { useEffect, useState } from 'react';
import { Typography, Container, Paper, Snackbar, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import { AddEditBankDetailsFormProps, BankDetailsFormData } from '../schema';
import BankDetailsForm from '../BankDetailsForm';


export default function AddEditBankDetailsPage({ employeeId, initialData }: AddEditBankDetailsFormProps) {
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success')
  const [editFlag, setEditFlag] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: BankDetailsFormData) => {
    try {
      const _url = `/api/employee/details/bank-details/${editFlag ? data?.id : ""}`;
      console.log('JSON.stringify(data):', JSON.stringify(data));
      setIsLoading(true);
      const response = await fetch(_url, {
        method: editFlag ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      setIsLoading(false);
      if (response.ok) {
        setSnackbarMessage(`Bank details ${editFlag ? "updated" : "added"} successfully`)
        setSnackbarSeverity('success')
        setOpenSnackbar(true)
        router.push(`/employee/employee/view-employee/${employeeId}`)
      } else {
        setSnackbarMessage(`Failed to ${editFlag ? "updated" : "added"} bank details. Please try again.`)
        setSnackbarSeverity('error')
        setOpenSnackbar(true)
      }
    } catch (error) {
      console.error(`Error ${editFlag ? "updating" : "adding"} bank details.`, error);
      setSnackbarMessage(`Failed to ${editFlag ? "update" : "add"} bank details. ${error}`)
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
        <BankDetailsForm
          initialData={initialData}
          isLoading={isLoading}
          onSubmit={handleSubmit}
          employeeId={employeeId}
        />
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


