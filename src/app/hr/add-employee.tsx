// FILE: /src/pages/hr/add-employee.tsx

import React from 'react';
import AddEmployeePage from '@/components/hr/add-employee/page';
import DashboardLayout from '@/components/DashboardLayout';

const AddEmployee: React.FC = () => {
  return (
    <DashboardLayout>
        <AddEmployeePage />
    </DashboardLayout>
  );
};

export default AddEmployee;