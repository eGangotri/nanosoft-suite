import MainLayout from '@/components/_layout/main-layout'
import '../../../styles/globals.css'
import EmployeeDashboard from '@/components/dashboard/EmployeeDashboard'


export default function EmpDashboard() {
  return (
    <MainLayout>
      <EmployeeDashboard />
    </MainLayout>
  )
}