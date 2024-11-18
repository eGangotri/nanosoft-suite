'use client'
import React from 'react';
import AddEmployeePage from '@/components/employee/add-employee/page';
import DashboardLayout from '@/components/_layout/dashboard-layout';
import LeaveTypeCRUD from '@/components/leaves-type/LeaveTypeCrud';

const AddEmployee: React.FC = () => {
  return (
    <DashboardLayout>
      <LeaveTypeCRUD />
    </DashboardLayout>
  );
};

export default AddEmployee;