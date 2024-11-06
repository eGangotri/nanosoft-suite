import DashboardLayout from '@/components/_layout/dashboard-layout'
import ProductList from '@/components/products/ProductList'

export default function ProductsPage() {
  return (
    <DashboardLayout>
      <ProductList />
    </DashboardLayout>
  )
}