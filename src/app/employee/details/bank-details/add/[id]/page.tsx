'use client'
import React from 'react';
import EmployeeListPage from '@/components/employee/page';
import DashboardLayout from '@/components/_layout/dashboard-layout';
import AddBankDetails from '@/components/employee/bank-details/add-bank-details/page';

const AddBankDetailsPage: React.FC = () => {
  return (
    <DashboardLayout>
        <AddBankDetails />
    </DashboardLayout>
  );
};

export default AddBankDetailsPage;