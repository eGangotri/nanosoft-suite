'use client'
import React from 'react';
import DashboardLayout from '@/components/_layout/dashboard-layout';
import EditEmployeePage from '@/components/employee/edit-employee/[id]/page';

const EditEmployee: React.FC = () => {
    return (
        <DashboardLayout>
            <EditEmployeePage id="100" />
        </DashboardLayout>
    );
};

export default EditEmployee;