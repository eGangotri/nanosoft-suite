'use client'
import DashboardLayout from '@/components/_layout/dashboard-layout';
import EditEmployeePage from '@/components/employee/edit-employee/page';
import { Typography } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

export default function EditEmployee() {
    const searchParams = useSearchParams()
    const id = searchParams.get('id')

    return (
        <DashboardLayout>
            <EditEmployeePage id={id as string} />
        </DashboardLayout>
    );
};
