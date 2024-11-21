'use client'
import React, { Suspense } from 'react';
import DashboardLayout from '@/components/_layout/dashboard-layout';
import AddBankDetails from '@/components/employee/bank-details/add-bank-details/page';
import { Skeleton, Typography } from '@mui/material';
import { useParams } from 'next/navigation';

const AddBankDetailsPage: React.FC = () => {
  function Add() {
    const params = useParams()
    const id = params.id as string
    if (!id) {
      return <Typography variant="h2">Employee Not Found</Typography>
    }
    return (
      <DashboardLayout>
        <AddBankDetails />
      </DashboardLayout>
    )
  }

  return (
    <Suspense fallback={<Skeleton variant="rectangular" width={210} height={118} />}>
      <Add />
    </Suspense>
  )

};

export default AddBankDetailsPage;

