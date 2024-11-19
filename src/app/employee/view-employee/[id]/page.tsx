import DashboardLayout from '@/components/_layout/dashboard-layout';
import { EmployeeData } from '@/components/employee/types';
import EmployeeView from '@/components/employee/view-employee/[id]/page';
import { notFound } from 'next/navigation';
import { mockEmployeeData } from '../mock-data';

async function getEmployeeDataX(id: string): Promise<EmployeeData> {
    // Replace this with your actual data fetching logic
    const res = await fetch(`https://api.example.com/employee/${id}`, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch employee data');
    }
    return res.json();
}

async function getEmployeeData(id: string): Promise<EmployeeData> {
    // Simulating API call with mock data
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

    // In a real scenario, you would fetch data based on the id
    // For now, we're always returning the same mock data
    return mockEmployeeData;
}

export default async function EmployeePage({ params }: { params: { id: string } }) {
    let employeeData: EmployeeData;

    try {
        employeeData = await getEmployeeData(params.id);
    } catch (error) {
        console.error('Error fetching employee data:', error);
        notFound();
    }

    return (
        <DashboardLayout>
            <EmployeeView employeeData={employeeData} />;
        </DashboardLayout>
    )

}