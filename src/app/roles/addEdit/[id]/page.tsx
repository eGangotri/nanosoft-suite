
'use client'

import MainLayout from '@/components/_layout/main-layout';
import RolesForm from '@/components/roles/addEdit/page';
import { useParams } from 'next/navigation';
import React from 'react';

const EditRoles: React.FC = () => {
const params = useParams();

    return (
        <MainLayout>
            <RolesForm userId={params?.id as string || ""}/>
        </MainLayout>
    );
};

export default EditRoles;

