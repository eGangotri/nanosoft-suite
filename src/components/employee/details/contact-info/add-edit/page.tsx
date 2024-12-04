import { use, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Typography, Container, Paper } from '@mui/material';
import { PrismaClient } from '@prisma/client';
import { EmergencyContactPageProps, EmployeeEmergencyContactFormData } from '../constants';
import { EmployeeEmergencyContactForm } from '../employeeContactForm';
import { ADD_EDIT_ENUM } from '@/utils/FormConsts';


export default function EmergencyContactPage({ employeeId, initialData }: EmergencyContactPageProps) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [editFlag, setEditFlag] = useState(false);

  const handleSubmit = async (data: EmployeeEmergencyContactFormData) => {
    try {
      const _url = `/app/employee/details/contact-info/${editFlag ? data?.id : ""}`;
      const response = await fetch(_url, {
        method: editFlag ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSuccessMessage(initialData ? 'Emergency contact updated successfully!' : 'Emergency contact added successfully!');
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
          onSubmit={handleSubmit}
          employeeId={employeeId}
        />
      </Paper>
    </Container>
  );
}


