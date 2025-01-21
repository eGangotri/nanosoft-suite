
'use client'

import MainLayout from '@/components/_layout/main-layout';
import RolesForm from '@/components/roles/addEdit/page';
import React from 'react';

const AddRoles: React.FC = () => {
    return (
        <MainLayout>
            <RolesForm />
        </MainLayout>
    );
};

export default AddRoles;

