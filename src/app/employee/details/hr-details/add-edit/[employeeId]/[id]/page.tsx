'use client'
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/_layout/dashboard-layout';
import { CircularProgress, Typography } from '@mui/material';
import { useParams } from 'next/navigation';
import { fetchBankDetails, fetchClients, fetchContactInfoById, fetchHrDetails, getEmployeeData } from '@/services/employeeService';
import { EmployeeEmergencyContactFormData } from '@/components/employee/details/contact-info/constants';
import { ADD_EDIT_ENUM, RELATIONSHIP_CATEGORIES } from '@/utils/FormConsts';
import EmergencyContactPage from '@/components/employee/details/contact-info/add-edit/page';
import { createEmptyEmployee, createEmptyHRDetails } from '@/app/employee/employee/EmployeeUtil';
import { EmployeeHrDetailsFormData } from '@/components/employee/details/hr/constants';

const AddHRDetailsPage: React.FC = () => {
    const emptyEmployee = createEmptyEmployee() as Employee
    const employeeHrDetails = createEmptyHRDetails();

    const emptyData = {
        ...employeeHrDetails,
        clientIds: [], // Optional field, can be an empty array
        EmployeeHrDetailsClients: [] // Initialize as an empty array
    }

    const [allClientsInCompany, setAllClientsInCompany] = useState<Client[]>([]);
    const [initialData, setInitialData] = useState<EmployeeHrDetailsFormData>(emptyData);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const id = params.id as string;
    const employeeId = params.employeeId as string;
    console.log(`id: ${id} employeeId: ${employeeId}`);

    useEffect(() => {
        const init = async (employeeId: number) => {
            const _id = Number.isNaN(parseInt(id)) ? 0 : parseInt(id);
            try {
                const data: EmployeeData | null = await getEmployeeData(employeeId);
                const _clients: Client[] = await fetchClients();
                setAllClientsInCompany(_clients);

                if (data && data?.EmployeeHrDetails?.employeeId === employeeId) {
                    console.log("edit", data.EmployeeHrDetails.employeeId === employeeId);
                    const hrDets = data.EmployeeHrDetails;
                    const clientIds = hrDets.EmployeeHrDetailsClients?.map((c: { clientId: number }) => c?.clientId) || [];
                    console.log(`--clientIds: ${JSON.stringify(clientIds)}`);
                    setInitialData({
                        ...data.EmployeeHrDetails,
                        clientIds
                    });
                }
                else {
                    setInitialData({
                        ...initialData,
                        employeeId: employeeId,
                        id: 0
                    });
                }
                setLoading(false);

            } catch (error) {
                setLoading(false);
                console.error('Error fetching Hr Details:', error);
                setInitialData({ ...initialData, employeeId: employeeId, id: 0 });
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
        return <Typography variant="h2">HR Details not found Not Found</Typography>;
    }

    return (
        <DashboardLayout>
            {/* <EmergencyContactPage employeeId={initialData.employeeId}
                initialData={initialData} /> */}
            {JSON.stringify(initialData)}
        </DashboardLayout>
    );
};

export default AddHRDetailsPage;