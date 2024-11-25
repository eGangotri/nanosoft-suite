'use client'
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/_layout/dashboard-layout';
import { CircularProgress, Typography } from '@mui/material';
import { useParams } from 'next/navigation';
import { fetchHrDetails } from '@/services/employeeService';
import AddHrDetails from '@/components/employee/details/hr/add-hr-details/page';
import EditHrDetails from '@/components/employee/details/hr/edit-hr-details/[id]/page';
import { EmployeeHrDetailsFormData } from '@/components/employee/details/hr/constants';

const ADD_EDIT_ENUM = { "ADD": 1, "EDIT": 2 }

const AddHRDetailsPage: React.FC = () => {
    const [addEdit, setAddEdit] = useState(ADD_EDIT_ENUM.ADD);
    const [employeeId, setEmployeeId] = useState(0);
    const [initialData, setInitialData] = useState<EmployeeHrDetailsFormData>({
        id: 0,
        employeeId: 0,
        dateOfJoining: new Date(),
        bonus: 0,
        passportNumber: "",
        passportIssueDate: new Date(),
        passportExpiryDate: new Date(),
        passType: "",
        passExpiryDate: null,
        renewalApplyDate: null,
        newApplyDate: null,
        passCancelledDate: null,
        clientId: null,
        remarks: null,
        employee: {} as Employee, // Replace with default/empty Employee object if available
        client: null, // Replace with default/empty Client object if available
    }
    );
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const id = params.id as string;

    useEffect(() => {
        const init = async (employeeId: number) => {
            try {
                setEmployeeId(employeeId);
                const data = await fetchHrDetails(employeeId);
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
                console.error('Error fetching Hr details:', error);
                throw new Error('Failed to fetch Hr details');
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
                <AddHrDetails employeeId={employeeId} initialData={initialData} />
            ) : (
                <EditHrDetails employeeId={employeeId} initialData={initialData} />
            )}
        </DashboardLayout>
    );
};

export default AddHRDetailsPage;