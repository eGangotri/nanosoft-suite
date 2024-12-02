'use client'
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/_layout/dashboard-layout';
import { CircularProgress, Typography } from '@mui/material';
import { useParams } from 'next/navigation';
import { fetchClients, fetchHrDetails, getEmployeeData } from '@/services/employeeService';
import AddHrDetails from '@/components/employee/details/hr/add-hr-details/page';
import EditHrDetails from '@/components/employee/details/hr/edit-hr-details/[id]/page';
import { EmployeeHrDetailsFormData } from '@/components/employee/details/hr/constants';
import { extractEmployeePortion } from '@/components/employee/EmployeeUtils';
import { createEmptyEmployee, createEmptyHRDetails } from '@/app/employee/employee/EmployeeUtil';

const ADD_EDIT_ENUM = { "ADD": 1, "EDIT": 2 }

const AddHRDetailsPage: React.FC = () => {
    const [addEdit, setAddEdit] = useState(ADD_EDIT_ENUM.ADD);
    const [employee, setEmployee] = useState({} as Employee);
    const [clients, setClients] = useState<Client[]>([]);
    const emptyEmployee = createEmptyEmployee() as Employee
    const employeeHrDetails = createEmptyHRDetails();

    const emptyData = {
        ...employeeHrDetails,
        clientIds: [], // Optional field, can be an empty array
        EmployeeHrDetailsClients: [] // Initialize as an empty array
    } 
    const [initialData, setInitialData] = useState<EmployeeHrDetailsFormData>(emptyData);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const id = params.id as string;

    useEffect(() => {
        const init = async (employeeId: number) => {
            try {
                const data: EmployeeData | null = await getEmployeeData(employeeId);
                const _clients: Client[] = await fetchClients();
                if (data) {
                    const _employee: Employee = extractEmployeePortion(data as EmployeeData);
                    setEmployee(_employee);
                    setClients(_clients);
                    console.log(`--data found for ID:
                         ${employeeId}
                         ${_employee.id}
                         ${JSON.stringify(data)}
                        ${JSON.stringify(data.EmployeeHrDetails)}`);

                    if (data?.EmployeeHrDetails?.employeeId === employeeId) {
                        console.log("edit", data.EmployeeHrDetails.employeeId === employeeId);
                        const hrDets = data.EmployeeHrDetails;
                        const clientIds = hrDets.EmployeeHrDetailsClients?.map((c: { clientId: number }) => c?.clientId) || [];
                        console.log(`--clientIds: ${JSON.stringify(clientIds)}`);
                        setInitialData({
                            ...data.EmployeeHrDetails,
                            clientIds
                        });
                        setAddEdit(ADD_EDIT_ENUM.EDIT);
                    } else {
                        console.log("add");
                        setAddEdit(ADD_EDIT_ENUM.ADD);
                        setInitialData({ ...emptyData, employeeId: employeeId });
                    }
                }
                else {
                    console.error(`No employee with id found. ${employeeId}`);
                    throw new Error(`No employee with id found. ${employeeId}`);
                }
            } catch (error) {
                console.error('Error in Hr details:', error);
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
                <AddHrDetails employee={employee} initialData={initialData} allClients={clients} />
            ) : (
                <EditHrDetails employee={employee} initialData={initialData} allClients={clients} />
            )}
        </DashboardLayout>
    );
};

export default AddHRDetailsPage;