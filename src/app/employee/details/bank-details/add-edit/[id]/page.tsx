'use client'
import React, { Suspense, useState } from 'react';
import DashboardLayout from '@/components/_layout/dashboard-layout';
import AddBankDetails from '@/components/employee/bank-details/add-bank-details/page';
import { CircularProgress, Skeleton, Typography } from '@mui/material';
import { useParams } from 'next/navigation';
import EditBankDetails from '@/components/employee/bank-details/edit-bank-details/[id]/page';
import { fetchBankDetails } from '@/services/employeeService';

const ADD_EDIT_ENUM = { "ADD": 1, "EDIT": 2 }
const AddBankDetailsPage: React.FC = () => {
    const [addEdit, setAddEdit] = useState(ADD_EDIT_ENUM.ADD);
    const _fetchBankDetails = async (employeeId: number) => {
        const data = await fetchBankDetails(employeeId);
        if (data && data.employee_id === employeeId) {
            setAddEdit(ADD_EDIT_ENUM.EDIT);
        }
    }
    async function AddEdit() {
        const params = useParams()
        const id = params.id as string
        if (!id) {
            return <Typography variant="h2">Employee Not Found</Typography>
        }
        await _fetchBankDetails(parseInt(id));
        return (
            <DashboardLayout>
                {addEdit === ADD_EDIT_ENUM.ADD ? <AddBankDetails /> : <EditBankDetails />}
            </DashboardLayout>
        )
    }

    return (
        <Suspense fallback={<CircularProgress />}>
            <AddEdit />
        </Suspense>
    )

};

export default AddBankDetailsPage;

