'use client'
import React, { Suspense } from 'react';
import DashboardLayout from '@/components/_layout/dashboard-layout';
import AddBankDetails from '@/components/employee/bank-details/add-bank-details/page';
import { CircularProgress, Skeleton, Typography } from '@mui/material';
import { useParams } from 'next/navigation';

const AddHrDetailsPage: React.FC = () => {
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
    <Suspense fallback={<CircularProgress />}>
      <Add />
    </Suspense>
  )

};

export default AddHrDetailsPage;

