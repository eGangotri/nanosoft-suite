'use client'
import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/_layout/main-layout';
import { CircularProgress, Typography } from '@mui/material';
import { useParams } from 'next/navigation';
import { getEmployeeData } from '@/services/employeeService';
import { extractEmployeePortion } from '@/components/employee/EmployeeUtils';
import EmployeeLeaveBalanceDisplay from '@/components/employee/details/leave-balance/page';

const LeaveBalanceByEmployeePage: React.FC = () => {
    const [initialData, setInitialData] = useState<EmployeeLeaveBalance[]>([]);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const employeeId = params.employeeId as string;
    console.log(` employeeId: ${employeeId}`);

    useEffect(() => {
        const init = async (employeeId: number) => {
            try {
                const data: EmployeeData | null = await getEmployeeData(employeeId);
                console.log(`--data: ${JSON.stringify(data?.id)}`);
                if (data) {
                    const leaveBalance = data.EmployeeLeaveBalance;
                    const employee = extractEmployeePortion(data);
                    console.log(`--employee: ${JSON.stringify(employee)}`);

                    leaveBalance.forEach((lb: EmployeeLeaveBalance) => {
                        lb.employee = employee;
                        lb.employeeId = employeeId;
                    });
                    setInitialData(leaveBalance);
                    console.log(`--leaveBalance: ${JSON.stringify(leaveBalance)}`);
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
        <MainLayout>
            <EmployeeLeaveBalanceDisplay 
                initialData={initialData} />
        </MainLayout>
    );
};

export default LeaveBalanceByEmployeePage;