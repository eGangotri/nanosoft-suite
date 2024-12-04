import { useEffect, useState } from 'react';
import { Typography, Container, Paper, Snackbar, Alert } from '@mui/material';
import { EmergencyContactPageProps, EmployeeEmergencyContactFormData } from '../constants';
import { EmployeeEmergencyContactForm } from '../employeeContactForm';
import { useRouter } from 'next/navigation';


export default function EmergencyContactPage({ employeeId, initialData }: EmergencyContactPageProps) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [editFlag, setEditFlag] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success')

  const handleSubmit = async (data: EmployeeEmergencyContactFormData) => {
    try {
      const _url = `/api/employee/details/contact-info/${editFlag ? data?.id : ""}`;
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
        setSnackbarMessage(`emergency contact ${editFlag ? "updated" : "added"} successfully`)
        setSnackbarSeverity('success')
        setOpenSnackbar(true)
        router.push(`/employee/employee/view-employee/${employeeId}`)
      } else {
        setSnackbarMessage(`Failed to ${editFlag ? "update" : "add"} emergency contact. Please try again.`)
        setSnackbarSeverity('error')
        setOpenSnackbar(true)
      }
    } catch (error) {
      console.error(`Error ${editFlag ? "updating" : "adding"} emergency contact.`, error);
      setSnackbarMessage(`Failed to ${editFlag ? "update" : "add"} emergency contact. ${error}`)
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
        <Typography variant="h4" gutterBottom>
          {editFlag ? 'Edit' : 'Add'} Emergency Contact
        </Typography>
        {successMessage && (
          <Typography color="success" gutterBottom>
            {successMessage}
          </Typography>
        )}
        <EmployeeEmergencyContactForm
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


