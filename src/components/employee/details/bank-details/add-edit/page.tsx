import { useEffect, useState } from 'react';
import { Typography, Container, Paper } from '@mui/material';
import { useRouter } from 'next/navigation';
import { AddEditBankDetailsFormProps, BankDetailsFormData } from '../schema';
import BankDetailsForm from '../BankDetailsForm';


export default function AddEditBankDetailsPage({ employeeId, initialData }: AddEditBankDetailsFormProps) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
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
        setSuccessMessage(editFlag ? 'Bank Detail updated successfully!' : 'Bank Detail added successfully!');
        router.push(`/employee/employee/view-employee/${employeeId}`)
      } else {
        throw new Error('Failed to save Bank Detail');
      }
    } catch (error) {
      console.error('Error saving Bank Detail:', error);
      alert('Failed to save Bank Detail. Please try again.');
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
          {editFlag ? 'Edit' : 'Add'} Bank Detail
        </Typography>
        {successMessage && (
          <Typography color="success" gutterBottom>
            {successMessage}
          </Typography>
        )}
        <BankDetailsForm
          initialData={initialData}
          isLoading={isLoading}
          onSubmit={handleSubmit}
          employeeId={employeeId}
        />
      </Paper>
    </Container>
  );
}


