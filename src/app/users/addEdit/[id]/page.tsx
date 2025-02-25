
'use client'

import MainLayout from '@/components/_layout/main-layout';
import UserForm from '@/components/users/addEdit/page';
import { useParams } from 'next/navigation';
import React from 'react';

const EditUser: React.FC = () => {
const params = useParams();

    return (
        <MainLayout>
            <UserForm userId={params?.id as string || ""}/>
        </MainLayout>
    );
};

export default EditUser;

