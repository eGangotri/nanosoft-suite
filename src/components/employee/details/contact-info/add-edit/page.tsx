import { useEffect, useState } from 'react';
import { Typography, Container, Paper } from '@mui/material';
import { EmergencyContactPageProps, EmployeeEmergencyContactFormData } from '../constants';
import { EmployeeEmergencyContactForm } from '../employeeContactForm';
import { useRouter } from 'next/navigation';


export default function EmergencyContactPage({ employeeId, initialData }: EmergencyContactPageProps) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [editFlag, setEditFlag] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
        setSuccessMessage(editFlag ? 'Emergency contact updated successfully!' : 'Emergency contact added successfully!');
        router.push(`/employee/employee/view-employee/${employeeId}`)
      } else {
        throw new Error('Failed to save emergency contact');
      }
    } catch (error) {
      console.error('Error saving emergency contact:', error);
      alert('Failed to save emergency contact. Please try again.');
    }
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
    </Container>
  );
}


