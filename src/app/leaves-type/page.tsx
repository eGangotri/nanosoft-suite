'use client'
import React from 'react';
import MainLayout from '@/components/_layout/main-layout';
import LeaveTypeCRUD from '@/components/leaves-type/LeaveTypeCrud';

const AddEmployee: React.FC = () => {
  return (
    <MainLayout>
      <LeaveTypeCRUD />
    </MainLayout>
  );
};

export default AddEmployee;