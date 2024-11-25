'use client'

import { CircularProgress, Typography } from '@mui/material';
import { useParams, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Skeleton } from '@mui/material';
import DashboardLayout from '@/components/_layout/dashboard-layout';
import EditBankDetails from '@/components/employee/bank-details/edit-bank-details/[id]/page';

export default function EditHrDetailsPage() {
    function Edit() {
        const params = useParams()
        const id = params.id as string
        if (!id) {
            return <Typography variant="h2">HR Detail Not Found</Typography>
        }
        return (
            <DashboardLayout>
                <EditBankDetails />
            </DashboardLayout>
        )
    }

    return (
        <Suspense fallback={<CircularProgress />}>
            <Edit />
        </Suspense>
    )
};
