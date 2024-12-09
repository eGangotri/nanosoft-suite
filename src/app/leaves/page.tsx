import DashboardLayout from '@/components/_layout/dashboard-layout';
import LeavesDashboardContent from '@/components/leaves/LeavesDashboardContent';
import Loading from '@/components/leaves/Loading';
import { Suspense } from 'react';

export default function DashboardPage() {
    return (
        <Suspense fallback={<Loading />}>
            <DashboardLayout>
                <LeavesDashboardContent />
            </DashboardLayout>
        </Suspense>
    );
}

