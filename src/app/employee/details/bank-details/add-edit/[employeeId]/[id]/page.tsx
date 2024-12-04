'use client'
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/_layout/dashboard-layout';
import { CircularProgress, Typography } from '@mui/material';
import { useParams } from 'next/navigation';
import { fetchBankDetails } from '@/services/employeeService';
import { BankDetailsFormData } from '@/components/employee/details/bank-details/schema';
import { ACCT_TYPES } from '@/utils/FormConsts';
import AddEditBankDetailsPage from '@/components/employee/details/bank-details/add-edit/page';

const AddBankDetailsPage: React.FC = () => {
    const emptyBankDetail: BankDetailsFormData = {
        employeeId: 0,
        bankName: '',
        employeeBankingName: '',
        accountNumber: '',
        accountType: ACCT_TYPES.Savings,
    };
    const [initialData, setInitialData] = useState<BankDetailsFormData>(emptyBankDetail);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const id = params.id as string;
    const employeeId = params.employeeId as string;
    console.log(`id: ${id} employeeId: ${employeeId}`);
    useEffect(() => {
        const init = async (employeeId: number) => {
            const _id = Number.isNaN(parseInt(id)) ? 0 : parseInt(id);
            try {
                if (_id > 0) {
                    const data = await fetchBankDetails(employeeId);
                    console.log(`data: ${JSON.stringify(data)} ${data?.employeeId === employeeId}`);
                    if (data && data.employeeId === employeeId) {
                        setInitialData(data);
                    }
                    else {
                        setInitialData({
                            ...initialData,
                            employeeId: employeeId,
                            id: 0
                        });
                    }
                } else {
                    console.log("add");
                    setInitialData({ ...initialData, employeeId: employeeId, id: 0 });
                }
                setLoading(false);

            } catch (error) {
                console.error('Error fetching bank details:', error);
                setInitialData({ ...initialData, employeeId: employeeId, id: 0 });
                setLoading(false);
            }
        };

        if (employeeId) {
            init(parseInt(employeeId));
        } else {
            setLoading(false);
        }
    }, [id]);

    if (loading) {
        return <CircularProgress />;
    }

    if (!id) {
        return <Typography variant="h2">Bank Detail Not Found</Typography>;
    }
    return (
        <DashboardLayout>
            <AddEditBankDetailsPage employeeId={initialData.employeeId}
                initialData={initialData} />
        </DashboardLayout>
    );
};

export default AddBankDetailsPage;