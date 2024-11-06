'use client'
import React from 'react';
import AddEmployeePage from '@/components/hr/add-employee/page';
import DashboardLayout from '@/components/_layout/DashboardLayout';

const AddEmployee: React.FC = () => {
  return (
    <DashboardLayout>
        <AddEmployeePage />
    </DashboardLayout>
  );
};

export default AddEmployee;