'use client'

import MainLayout from '@/components/_layout/main-layout';
import EmployeeView from '@/components/employee/view-employee/[id]/page';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getEmployeeData } from '@/services/employeeService';
import { CircularProgress } from '@mui/material';
import { create } from 'domain';
import { createEmptyEmployee } from '../../EmployeeUtil';

export default function EmployeePage({ params }: { params: { id: string } }) {
    const [employeeData, setEmployeeData] = useState<EmployeeData>({} as EmployeeData);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data: EmployeeData | EmployeeError | null = await getEmployeeData(parseInt(params?.id as string));
                setLoading(false);

                if (data && 'error' in data) {
                    console.error(`Error fetching employee data: ${data.error}`);
                    notFound();
                }
                console.log(`Employee data: ${JSON.stringify(data)}`);
                if (data) {
                    setEmployeeData(data);
                }
            } catch (error) {
                console.error('Error fetching employee data:', error);
                notFound();
            }
        };
        setLoading(true);
        fetchData();
    }, [params.id]);

    return (
        <MainLayout>
            {loading && <CircularProgress />}
            <EmployeeView employeeData={employeeData} />
        </MainLayout>
    )

}