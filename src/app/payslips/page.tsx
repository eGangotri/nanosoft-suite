'use client'

import MainLayout from '@/components/_layout/main-layout';
import Loading from '@/components/leaves/Loading';
import PayslipDashboard from '@/components/payslips/page';
import React, { Suspense, useState } from 'react';

export default function PayslipPage() {
    return (
        <Suspense fallback={<Loading />}>
            <MainLayout>
                <PayslipDashboard />
            </MainLayout>
        </Suspense>
    );
}
