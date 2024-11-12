'use client'
import DashboardLayout from '@/components/_layout/dashboard-layout';
import EditEmployeePage from '@/components/employee/edit-employee/page';
import { Typography } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { Suspense } from 'react';
import { Skeleton } from '@mui/material';

export default function EditEmployee() {
    function Edit() {
        const searchParams = useSearchParams()
        const id = searchParams.get('id') || "";
        if (!id) {
            return <Typography variant="h2">Employee Not Found</Typography>
        }
        return (
             <DashboardLayout>
            <EditEmployeePage id={id} />
             </DashboardLayout>
        )
    }

    return (
        <Suspense fallback={<Skeleton variant="rectangular" width={210} height={118} />}>
            <Edit />
        </Suspense>
    )
};
