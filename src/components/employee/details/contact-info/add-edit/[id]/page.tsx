import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { Typography, Container, Paper } from '@mui/material';
import { PrismaClient } from '@prisma/client';
import { EmergencyContactPageProps, EmployeeEmergencyContactFormData } from '../../constants';
import { EmployeeEmergencyContactForm } from '../../employeeContactForm';


export default function EmergencyContactPage({ employeeId, initialData }: EmergencyContactPageProps) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (data: EmployeeEmergencyContactFormData) => {
    try {
      const response = await fetch('/api/employee-emergency-contact', {
        method: initialData ? 'PUT' : 'POST',
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

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          {initialData ? 'Edit' : 'Add'} Emergency Contact
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const employeeId = Number(context.params?.id);

  if (isNaN(employeeId)) {
    return { notFound: true };
  }

  const prisma = new PrismaClient();

  try {
    const emergencyContact = await prisma.employeeEmergencyContact.findFirst({
      where: { employeeId },
    });

    return {
      props: {
        employeeId,
        initialData: emergencyContact ? {
          ...emergencyContact,
          employeeId: emergencyContact.employeeId,
        } : undefined,
      },
    };
  } catch (error) {
    console.error('Error fetching emergency contact:', error);
    return { props: { employeeId } };
  } finally {
    await prisma.$disconnect();
  }
};

