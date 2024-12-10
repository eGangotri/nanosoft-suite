'use client'
import EditEmployeePage from '@/components/employee/edit-employee/page';
import { Typography } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Skeleton } from '@mui/material';
import MainLayout from '@/components/_layout/main-layout';

export default function EditEmployee() {
    function Edit() {
        const searchParams = useSearchParams()
        const id = searchParams.get('id') || "";
        if (!id) {
            return <Typography variant="h2">Employee Not Found</Typography>
        }
        return (
            <MainLayout>
                <EditEmployeePage id={id} />
            </MainLayout>
        )
    }

    return (
        <Suspense fallback={<Skeleton variant="rectangular" width={210} height={118} />}>
            <Edit />
        </Suspense>
    )
};
