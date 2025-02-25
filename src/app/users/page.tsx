
'use client'

import MainLayout from '@/components/_layout/main-layout';
import UserListingPage from '@/components/users/page';
import React from 'react';

const UserListing: React.FC = () => {
    return (
        <MainLayout>
            <UserListingPage />
        </MainLayout>
    );
};

export default UserListing;

