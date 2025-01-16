
'use client'

import MainLayout from '@/components/_layout/main-layout';
import UserForm from '@/components/users/addEdit/page';
import UserListingPage from '@/components/users/page';
import React from 'react';

const ClaimsListing: React.FC = () => {
    return (
        <MainLayout>
            <UserForm />
        </MainLayout>
    );
};

export default ClaimsListing;

