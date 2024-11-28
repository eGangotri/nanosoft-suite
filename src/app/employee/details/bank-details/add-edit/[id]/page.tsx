'use client'
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/_layout/dashboard-layout';
import { CircularProgress, Typography } from '@mui/material';
import { useParams } from 'next/navigation';
import { fetchBankDetails } from '@/services/employeeService';
import { BankDetailsFormData } from '@/components/employee/details/bank-details/schema';
import AddBankDetails from '@/components/employee/details/bank-details/add-bank-details/page';
import EditBankDetails from '@/components/employee/details/bank-details/edit-bank-details/[id]/page';

const ADD_EDIT_ENUM = { "ADD": 1, "EDIT": 2 }

const AddBankDetailsPage: React.FC = () => {
    const [addEdit, setAddEdit] = useState(ADD_EDIT_ENUM.ADD);
    const [employeeId, setEmployeeId] = useState(0);
    const [initialData, setInitialData] = useState<BankDetailsFormData>({
        employeeId: employeeId,
        bankName: '',
        employeeBankingName: '',
        accountNumber: '',
        accountType: 'Savings',
    });
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const id = params.id as string;

    useEffect(() => {
        const init = async (employeeId: number) => {
            try {
                setEmployeeId(employeeId);
                const data = await fetchBankDetails(employeeId);
                console.log(`data: ${JSON.stringify(data)} ${data?.employeeId === employeeId}`);
                if (data && data.employeeId === employeeId) {
                    setInitialData(data);
                    setAddEdit(ADD_EDIT_ENUM.EDIT);
                } else {
                    setAddEdit(ADD_EDIT_ENUM.ADD);
                    setInitialData({
                        ...initialData,
                        employeeId: employeeId
                    });
                }
            } catch (error) {
                console.error('Error fetching bank details:', error);
                throw new Error('Failed to fetch bank details');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            init(parseInt(id));
        } else {
            setLoading(false);
        }
    }, [id]);

    if (loading) {
        return <CircularProgress />;
    }

    if (!id) {
        return <Typography variant="h2">Employee Not Found</Typography>;
    }

    return (
        <DashboardLayout>
            {addEdit === ADD_EDIT_ENUM.ADD ? (
                <AddBankDetails employeeId={employeeId} initialData={initialData} />
            ) : (
                <EditBankDetails employeeId={employeeId} initialData={initialData} />
            )}
        </DashboardLayout>
    );
};

export default AddBankDetailsPage;