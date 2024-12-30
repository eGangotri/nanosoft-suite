import Dashboard from "@/components/tenant/dashboard";
import { getTenants } from "@/services/tenantService";

export default async function DashboardPage() {
    const initialTenants = await getTenants()
  
    return <Dashboard initialTenants={initialTenants} />
  }
  
  