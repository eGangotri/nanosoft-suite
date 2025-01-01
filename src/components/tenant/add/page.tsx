'use client'

import { TenantFormData } from '@/components/tenantRegistration/schema';
import TenantForm from '@/components/tenantRegistration/TenantRegistrationForm';
import React from 'react';
import { useRouter } from 'next/navigation'

export default function AddTenantPage() {
  const router = useRouter();

  const handleSubmit = async (data: TenantFormData) => {
    const response = await fetch('/api/tenant', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to add tenant');
    }
    router.push(`/tenant/dashbaord`)

  };

  return <TenantForm onSubmit={handleSubmit} isEditMode={false} />;
}

