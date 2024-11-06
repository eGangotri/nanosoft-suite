'use client'
import React from 'react';
import DashboardLayout from '@/components/_layout/dashboard-layout';
import EmployeeListPage from '@/components/employee/page';

const ListEmployee: React.FC = () => {
  return (
    <DashboardLayout>
        <EmployeeListPage />
    </DashboardLayout>
  );
};

export default ListEmployee;