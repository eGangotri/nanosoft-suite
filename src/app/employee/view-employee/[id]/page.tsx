'use client'

import DashboardLayout from '@/components/_layout/dashboard-layout';
import { EmployeeData } from '@/components/employee/types';
import EmployeeView from '@/components/employee/view-employee/[id]/page';
import { notFound } from 'next/navigation';
import { mockEmployeeData } from '../mock-data';
import { useEffect, useState } from 'react';
import { getEmployeeData } from '@/services/employeeService';

export default function EmployeePage({ params }: { params: { id: string } }) {
    const [employeeData, setEmployeeData] = useState<EmployeeData>(mockEmployeeData);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getEmployeeData(params.id);
                console.log(`Employee data: ${JSON.stringify(data)}`);
                setEmployeeData(data);
            } catch (error) {
                console.error('Error fetching employee data:', error);
                notFound();
            }
        };
        fetchData();
    }, [params.id]);

    return (
        <DashboardLayout>
            <EmployeeView employeeData={employeeData} />;
        </DashboardLayout>
    )

}