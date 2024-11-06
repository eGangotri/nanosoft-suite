import DashboardLayout from '@/components/_layout/dashboard-layout'
import DashboardContent from '@/components/dashboard/DashboardContent'
import '../styles/globals.css'

export default function Home() {
  return (
    <DashboardLayout>
      <DashboardContent />
    </DashboardLayout>
  )
}