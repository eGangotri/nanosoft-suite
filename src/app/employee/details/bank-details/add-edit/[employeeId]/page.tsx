'use client'
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/_layout/dashboard-layout';
import { CircularProgress, Typography } from '@mui/material';
import { useParams } from 'next/navigation';
import { fetchBankDetails } from '@/services/employeeService';
import { BankDetailsFormData } from '@/components/employee/details/bank-details/schema';
import { ACCT_TYPES } from '@/utils/FormConsts';
import AddEditBankDetailsPage from '@/components/employee/details/bank-details/add-edit/page';

const BankDetailsPage: React.FC = () => {
    const emptyData: BankDetailsFormData = {
        employeeId: 0,
        bankName: '',
        employeeBankingName: '',
        accountNumber: '',
        accountType: ACCT_TYPES.Savings,
    };
    const [initialData, setInitialData] = useState<BankDetailsFormData>(emptyData);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const employeeId = params.employeeId as string;
    console.log(` employeeId: ${employeeId}`);
    useEffect(() => {
        const init = async (employeeId: number) => {
            try {
                const data = await fetchBankDetails(employeeId);
                console.log(`data: ${JSON.stringify(data)} ${data?.employeeId === employeeId}`);
                if (data && data.employeeId === employeeId) {
                    setInitialData(data);
                }
                else {
                    setInitialData({
                        ...initialData,
                        id: 0
                    });
                }
                setLoading(false);

            } catch (error) {
                console.error('Error fetching bank details:', error);
                setInitialData({ ...initialData, id: 0 });
                setLoading(false);
            }
        };

        if (employeeId) {
            init(parseInt(employeeId));
        } else {
            setLoading(false);
        }
    }, [employeeId]);

    if (loading) {
        return <CircularProgress />;
    }

    if (!employeeId) {
        return <Typography variant="h2">Bank Detail Not Found</Typography>;
    }
    return (
        <DashboardLayout>
            <AddEditBankDetailsPage
                initialData={initialData} />
        </DashboardLayout>
    );
};

export default BankDetailsPage;