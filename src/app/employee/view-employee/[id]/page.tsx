'use client'

import DashboardLayout from '@/components/_layout/dashboard-layout';
import EmployeeView from '@/components/employee/view-employee/[id]/page';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getEmployeeData } from '@/services/employeeService';
import { CircularProgress } from '@mui/material';

export default function EmployeePage({ params }: { params: { id: string } }) {
    const [employeeData, setEmployeeData] = useState<EmployeeData>({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data: EmployeeData | EmployeeError = await getEmployeeData(params.id);
                setLoading(false);

                if ('error' in data) {
                    console.error(`Error fetching employee data: ${data.error}`);
                    notFound();
                }
                console.log(`Employee data: ${JSON.stringify(data)}`);
                setEmployeeData(data);
            } catch (error) {
                console.error('Error fetching employee data:', error);
                notFound();
            }
        };
        setLoading(true);
        fetchData();
    }, [params.id]);

    return (
        <DashboardLayout>
            {loading && <CircularProgress />}
            <EmployeeView employeeData={employeeData} />
        </DashboardLayout>
    )

}