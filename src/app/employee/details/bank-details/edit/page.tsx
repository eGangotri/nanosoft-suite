'use client'

import { Typography } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Skeleton } from '@mui/material';
import DashboardLayout from '@/components/_layout/dashboard-layout';
import EditBankDetails from '@/components/employee/bank-details/edit-bank-details/[id]/page';

export default function EditBankDetailsPage() {
    function Edit() {
        const searchParams = useSearchParams()
        const id = searchParams.get('id') || "";
        if (!id) {
            return <Typography variant="h2">Bank Detail Not Found</Typography>
        }
        return (
            <DashboardLayout>
                <EditBankDetails />
                {/* <EditBankDetails id={id} /> */}
            </DashboardLayout>
        )
    }

    return (
        <Suspense fallback={<Skeleton variant="rectangular" width={210} height={118} />}>
            <Edit />
        </Suspense>
    )
};
