'use client'

import React from 'react'
import EmployeeForm from '../employee-form'
import { EmployeeFormData } from '../employee-form' // Make sure to export this type from employee-form.tsx

export default function AddEmployeePage() {
  const handleSubmit = (data: EmployeeFormData) => {
    // Here you would typically send the data to your backend
    console.log('Submitted employee data:', data)
    // You can add your API call here
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Add New Employee</h1>
      <EmployeeForm onSubmit={handleSubmit} />
    </div>
  )
}