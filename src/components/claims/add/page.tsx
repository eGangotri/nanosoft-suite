'use client'

import React from 'react';
import { Typography, Container } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Claim } from '../ClaimSchema';
import { ClaimForm } from '../ClaimForm';

const AddClaimPage: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (data: Claim) => {
    try {
      const response = await fetch('/api/claims', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create claim');
      }

      // Handle successful creation
      console.log('Claim created successfully');
      router.push('/claims');
    } catch (error) {
      console.error('Error creating claim:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Add New Claim
      </Typography>
      <ClaimForm onSubmit={handleSubmit} />
    </Container>
  );
};

export default AddClaimPage;

