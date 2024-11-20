'use client'

import { Typography } from '@mui/material';
import { useParams, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Skeleton } from '@mui/material';
import DashboardLayout from '@/components/_layout/dashboard-layout';
import EditBankDetails from '@/components/employee/bank-details/edit-bank-details/[id]/page';

export default function EditBankDetailsPage() {
    function Edit() {
        const params = useParams()
        const id = params.id as string
        if (!id) {
            return <Typography variant="h2">Bank Detail Not Found</Typography>
        }
        return (
            <DashboardLayout>
                <EditBankDetails />
            </DashboardLayout>
        )
    }

    return (
        <Suspense fallback={<Skeleton variant="rectangular" width={210} height={118} />}>
            <Edit />
        </Suspense>
    )
};
