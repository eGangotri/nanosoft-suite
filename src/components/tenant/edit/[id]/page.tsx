'use client'

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { TenantFormData } from '@/components/tenantRegistration/schema';
import TenantForm from '@/components/tenantRegistration/TenantRegistrationForm';

export default function EditTenantPage() {
  const { id } = useParams();
  const [tenant, setTenant] = useState<TenantFormData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchTenant = async () => {
      const response = await fetch(`/api/tenant/${id}`);
      if (response.ok) {
        const data = await response.json();
        setTenant(data);
      } else {
        console.error('Failed to fetch tenant');
      }
    };

    fetchTenant();
  }, [id]);

  const handleSubmit = async (data: TenantFormData) => {
    const response = await fetch(`/api/tenant/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update tenant');
    }
    const _data = await response.json()
    router.push(`/tenant/dashbaord`)
  };

  if (!tenant) {
    return <div>Loading...</div>;
  }

  return <TenantForm initialData={tenant} onSubmit={handleSubmit} isEditMode={true} />;
}

