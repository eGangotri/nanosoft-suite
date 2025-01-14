
'use client'

import MainLayout from '@/components/_layout/main-layout';
import UserListingPage from '@/components/users/page';
import React from 'react';

const ClaimsListing: React.FC = () => {
    return (
        <MainLayout>
            <UserListingPage />
        </MainLayout>
    );
};

export default ClaimsListing;

