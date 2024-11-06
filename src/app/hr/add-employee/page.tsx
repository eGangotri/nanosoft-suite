'use client'
import React from 'react';
import AddEmployeePage from '@/components/hr/add-employee/page';
import DashboardLayout from '@/components/_layout/dashboard-layout';

const AddEmployee: React.FC = () => {
  return (
    <DashboardLayout>
        <AddEmployeePage />
    </DashboardLayout>
  );
};

export default AddEmployee;