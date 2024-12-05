'use client'
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/_layout/dashboard-layout';
import { CircularProgress, Typography } from '@mui/material';
import { useParams } from 'next/navigation';
import { fetchClients, getEmployeeData } from '@/services/employeeService';
import { createEmptyHRDetails } from '@/app/employee/employee/EmployeeUtil';
import { EmployeeHrDetailsFormData } from '@/components/employee/details/hr/constants';
import AddEditHrDetailsPage from '@/components/employee/details/hr/add-edit/page';
import { extractEmployeePortion } from '@/components/employee/EmployeeUtils';

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
                console.log(`--data: ${JSON.stringify(data?.id)}`);
                if (data) {
                    const hrDets = data.EmployeeHrDetails || emptyData;
                    const employee = extractEmployeePortion(data);
                    console.log(`--employee: ${JSON.stringify(employee)}`);

                    hrDets.employee = employee;
                    hrDets.employeeId = employeeId;
                    console.log(`--hrDets: ${JSON.stringify(hrDets)}`);
                    if (data?.EmployeeHrDetails && data?.EmployeeHrDetails?.employeeId === employeeId) {
                        const clientIds = hrDets.EmployeeHrDetailsClients?.map((c: { clientId: number }) => c?.clientId) || [];
                        console.log(`--clientIds: ${JSON.stringify(clientIds)}`);
                        setInitialData({
                            ...hrDets,
                            clientIds
                        });
                    }
                    else {
                        console.log(`--hrDets: ${JSON.stringify(hrDets)}`);
                        setInitialData({
                            ...hrDets,
                        });
                    }
                }
                else {
                    console.log('Employee not found');
                    throw new Error('Employee not found');
                }
                setLoading(false);

            } catch (error) {
                setLoading(false);
                console.error('Error fetching employee data:', error);
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
            <AddEditHrDetailsPage allClients={allClientsInCompany}
                initialData={initialData} />
        </DashboardLayout>
    );
};

export default AddHRDetailsPage;