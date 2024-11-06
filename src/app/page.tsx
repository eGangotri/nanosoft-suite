import DashboardLayout from '@/components/_layout/DashboardLayout'
import DashboardContent from '@/components/dashboard/DashboardContent'
import '../styles/globals.css'

export default function Home() {
  return (
    <DashboardLayout>
      <DashboardContent />
    </DashboardLayout>
  )
}