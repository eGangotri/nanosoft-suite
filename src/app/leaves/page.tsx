import MainLayout from '@/components/_layout/main-layout';
import LeavesDashboardContent from '@/components/leaves/LeavesDashboardContent';
import Loading from '@/components/leaves/Loading';
import { Suspense } from 'react';

export default function DashboardPage() {
    return (
        <Suspense fallback={<Loading />}>
            <MainLayout>
                <LeavesDashboardContent />
            </MainLayout>
        </Suspense>
    );
}

