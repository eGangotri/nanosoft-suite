'use client'
import React from 'react';
import AddEmployeePage from '@/components/employee/add-employee/page';
import MainLayout from '@/components/_layout/main-layout';

const AddEmployee: React.FC = () => {
  return (
     <MainLayout>
        <AddEmployeePage />
     </MainLayout>
  );
};

export default AddEmployee;