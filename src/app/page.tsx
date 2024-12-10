import MainLayout from '@/components/_layout/main-layout'
import AdminDashboard from '@/components/dashboard/AdminDashboard/page'
import '../styles/globals.css'


export default function Home() {
  return (
    <MainLayout>
      <AdminDashboard />
    </MainLayout>
  )
}