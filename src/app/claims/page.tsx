'use client'

import MainLayout from '@/components/_layout/main-layout';
import ClaimsListPage from '@/components/claims/page';
import { Typography } from '@mui/material';
import React from 'react';

const ClaimsListing: React.FC = () => {
  return (
    <MainLayout>
      <ClaimsListPage />
    </MainLayout>
  );
};

export default ClaimsListing;

