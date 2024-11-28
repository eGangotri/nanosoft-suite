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
import { EmployeeEmergencyContactFormData } from '@/components/employee/details/contact-info/constants';

const ADD_EDIT_ENUM = { "ADD": 1, "EDIT": 2 }

const AddEditEmercencyContactInfo: React.FC = () => {
    const [addEdit, setAddEdit] = useState(ADD_EDIT_ENUM.ADD);
    const [employee, setEmployee] = useState({} as Employee);
    const [initialData, setInitialData] = useState<EmployeeEmergencyContactFormData>({
        employeeId: 1,
        personName: "",
        relationship: "friend",
        mobile: "",
        address: ""
    }
    );
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const id = params.id as string;

    useEffect(() => {
        const init = async (employeeId: number) => {
            try {
                const data: EmployeeData | null = await getEmployeeData(employeeId);
                if (data) {
                    const _employee: Employee = extractEmployeePortion(data as EmployeeData);
                    setEmployee(_employee);
                    console.log(`--data found for ID:
                         ${employeeId}
                         ${_employee.id}
                         ${JSON.stringify(data)}
                        ${JSON.stringify(data.emergencyContacts)}`);

                    if (data?.emergencyContacts?.length > 0) {
                        console.log("edit", data.emergencyContacts[0].employeeId === employeeId);
                        setInitialData(data.emergencyContacts[0] as EmployeeEmergencyContactFormData);
                        setAddEdit(ADD_EDIT_ENUM.EDIT);
                    } else {
                        console.log("add");
                        setAddEdit(ADD_EDIT_ENUM.ADD);
                        setInitialData({ ...initialData, employeeId: employeeId });
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
                <AddHrDetails employee={employee} initialData={initialData} clients={clients} />
            ) : (
                <EditHrDetails employee={employee} initialData={initialData} clients={clients} />
            )}
        </DashboardLayout>
    );
};

export default AddEditEmercencyContactInfo;