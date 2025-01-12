'use client'

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Typography, Container, CircularProgress } from '@mui/material';
import { Claim } from '../../ClaimSchema';
import { ClaimForm } from '../../ClaimForm';

const EditClaimPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const [claim, setClaim] = useState<Claim | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params?.id) {
      fetchClaim();
    }
  }, [params?.id]);

  const fetchClaim = async () => {
    try {
      const response = await fetch(`/api/claims/${params?.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch claim');
      }
      const data = await response.json();
      setClaim(data);
    } catch (error) {
      console.error('Error fetching claim:', error);
      // Handle error (e.g., show error message to user)
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: Claim) => {
    try {
      const response = await fetch(`/api/claims/${params?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update claim');
      }

      // Handle successful update
      console.log('Claim updated successfully');
      router.push('/claims');
    } catch (error) {
      console.error('Error updating claim:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Edit Claim
      </Typography>
      {claim && <ClaimForm onSubmit={handleSubmit} initialData={claim} />}
    </Container>
  );
};

export default EditClaimPage;

