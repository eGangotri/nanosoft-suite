'use client'
import React from 'react';
import EmployeeListPage from '@/components/employee/page';
import MainLayout from '@/components/_layout/main-layout';

const ListEmployee: React.FC = () => {
  return (
    <MainLayout>
        <EmployeeListPage />
    </MainLayout>
  );
};

export default ListEmployee;