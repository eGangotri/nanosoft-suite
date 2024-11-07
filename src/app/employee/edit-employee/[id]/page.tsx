'use client'
import DashboardLayout from '@/components/_layout/dashboard-layout';
import EditEmployeePage from '@/components/employee/edit-employee/[id]/page';

export default function EditEmployee({ params }: { params: { id: string } }) {

    return (
        <DashboardLayout>
            <EditEmployeePage id={params.id} />
        </DashboardLayout>
    );
};
