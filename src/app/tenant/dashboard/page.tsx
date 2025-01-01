'use client'

import { useEffect, useState } from 'react';
import Dashboard from "@/components/tenant/dashboard";
import { getTenants } from "@/services/tenantService";
import MainLayout from '@/components/_layout/main-layout';

export default function DashboardPage() {
  const [tenants, setTenants] = useState<Tenant[]>([]);

  useEffect(() => {
    async function fetchTenants() {
      try {
        const initialTenants = await getTenants();
        setTenants(initialTenants || []);
      } catch (error) {
        console.error('Failed to fetch tenants:', error);
      }
    }

    fetchTenants();
  }, []);

  return (

    <MainLayout>
      <Dashboard initialTenants={tenants} />
    </MainLayout>
  )
}