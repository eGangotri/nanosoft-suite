
'use client'

import MainLayout from '@/components/_layout/main-layout';
import RolesListingPage from '@/components/roles/page';
import React from 'react';

const RolesList: React.FC = () => {
    return (
        <MainLayout>
            <RolesListingPage />
        </MainLayout>
    );
};

export default RolesList;

