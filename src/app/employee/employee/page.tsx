'use client'
import React from 'react';
import EmployeeListPage from '@/components/employee/page';
import DashboardLayout from '@/components/_layout/dashboard-layout';

const ListEmployee: React.FC = () => {
  return (
    <DashboardLayout>
        <EmployeeListPage />
    </DashboardLayout>
  );
};

export default ListEmployee;