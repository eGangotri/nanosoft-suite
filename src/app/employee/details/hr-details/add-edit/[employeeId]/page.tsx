'use client'
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/_layout/dashboard-layout';
import { CircularProgress, Typography } from '@mui/material';
import { useParams } from 'next/navigation';
import { fetchClients, getEmployeeData } from '@/services/employeeService';
import { createEmptyHRDetails } from '@/app/employee/employee/EmployeeUtil';
import { EmployeeHrDetailsFormData } from '@/components/employee/details/hr/constants';
import AddEditHrDetailsPage from '@/components/employee/details/hr/add-edit/page';

const AddHRDetailsPage: React.FC = () => {
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
    const employeeId = params.employeeId as string;
    console.log(` employeeId: ${employeeId}`);

    useEffect(() => {
        const init = async (employeeId: number) => {
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
    }, [employeeId]);

    if (loading) {
        return <CircularProgress />;
    }

    if (!employeeId) {
        return <Typography variant="h2">HR Details not found Not Found</Typography>;
    }

    return (
        <DashboardLayout>
            {<AddEditHrDetailsPage allClients={allClientsInCompany}
                initialData={initialData} />}
        </DashboardLayout>
    );
};

export default AddHRDetailsPage;