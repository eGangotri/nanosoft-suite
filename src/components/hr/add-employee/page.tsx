'use client'

import React from 'react'
import EmployeeForm from '../employee-form'
import { EmployeeFormData } from '../employee-form' // Make sure to export this type from employee-form.tsx

export default function AddEmployeePage() {
  const handleSubmit = async (data: EmployeeFormData) => {
    try {
      const response = await fetch('/api/employee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      console.log('Submitted employee data:', JSON.stringify(result));
    } catch (error) {
      console.error('Error submitting employee data:', JSON.stringify(error));
    }
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Add New Employee</h1>
      <EmployeeForm onSubmit={handleSubmit} />
    </div>
  )
}