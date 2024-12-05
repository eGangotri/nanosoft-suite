'use client'
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/_layout/dashboard-layout';
import { CircularProgress, Typography } from '@mui/material';
import { useParams } from 'next/navigation';
import { fetchContactInfoById } from '@/services/employeeService';
import { EmployeeEmergencyContactFormData } from '@/components/employee/details/contact-info/constants';
import { RELATIONSHIP_CATEGORIES } from '@/utils/FormConsts';
import EmergencyContactPage from '@/components/employee/details/contact-info/add-edit/page';

const AddEditEmercencyContactInfo: React.FC = () => {
    const emptyData: EmployeeEmergencyContactFormData = {
        id:0,
        employeeId: 0,
        personName: "",
        relationship: RELATIONSHIP_CATEGORIES.Spouse,
        mobile: "",
        address: ""
    };
    const [initialData, setInitialData] = useState<EmployeeEmergencyContactFormData>(emptyData
    );
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const id = params.id as string;
    const employeeId = params.employeeId as string;

    useEffect(() => {
        const init = async (employeeId: number) => {
            const _id = Number.isNaN(parseInt(id)) ? 0 : parseInt(id);
            try {
                if (_id > 0) {
                    const data: EmployeeEmergencyContact = await fetchContactInfoById(_id) || {
                        ...emptyData,
                        id: 0
                    };
                    if (data) {
                        setInitialData(data as EmployeeEmergencyContactFormData);
                    }
                    else {
                        setInitialData({ ...initialData, employeeId: employeeId, id: 0 });
                    }
                } else {
                    console.log("add");
                    setInitialData({ ...initialData, employeeId: employeeId, id: 0 });
                }
                setLoading(false);

            } catch (error) {
                console.error('Error in Emergency Contact Info:', error);
                //throw new Error('Failed to fetch Emergency Contact Info');
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
        return <Typography variant="h2">Emergency Contact Info Not Found</Typography>;
    }

    return (
        <DashboardLayout>
            <EmergencyContactPage employeeId={initialData.employeeId}
                initialData={initialData} />
        </DashboardLayout>
    );
};

export default AddEditEmercencyContactInfo;