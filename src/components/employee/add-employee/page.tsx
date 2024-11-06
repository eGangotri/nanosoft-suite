'use client'

import React from 'react'
import EmployeeForm from '../employee-form'
import { EmployeeFormData } from '../employee-form' // Make sure to export this type from employee-form.tsx
import { useRouter } from 'next/navigation'

export default function AddEmployeePage() {
  const router = useRouter()

  const handleSubmit = async (data: EmployeeFormData) => {
    try {
      const response = await fetch('/api/employee/add-employee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log('response.ok ?', JSON.stringify(response));

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create employee')
      }

      const _data = await response.json()
      console.log('Employee created:', _data)
      router.push('/employee/list')
    } catch (error) {
      console.error('Error:', error)
      //setError(error instanceof Error ? error.message : 'An unexpected error occurred')
    }
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <EmployeeForm onSubmit={handleSubmit} />
    </div>
  )
}