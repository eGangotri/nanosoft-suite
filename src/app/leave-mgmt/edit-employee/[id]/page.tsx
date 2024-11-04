'use client'

import React, { useEffect, useState } from 'react'
import EmployeeForm, { EmployeeFormData } from '../../employee-form'

interface EditEmployeePageProps {
  params: { id: string }
}

export default function EditEmployeePage({ params }: EditEmployeePageProps) {
  const { id } = params;
  const [employeeData, setEmployeeData] = useState<EmployeeFormData | null>(null)

  useEffect(() => {
    // Fetch employee data here
    // This is just a placeholder, replace with your actual API call
    const fetchData = async () => {
      // const response = await fetch(`/api/employees/${employeeId}`)
      // const data: EmployeeFormData = await response.json()
      // setEmployeeData(data)
      console.log('Fetching employee data for ID:', id)
      // Simulated data
      setEmployeeData({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        dateOfBirth: new Date('1990-01-01'),
        department: 'IT',
        isActive: true,
      })
    }
    fetchData()
  }, [id])

  const handleSubmit = (data: EmployeeFormData) => {
    // Here you would typically send the updated data to your backend
    console.log('Updated employee data:', data)
    // You can add your API call here
  }

  if (!employeeData) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Edit Employee</h1>
      <EmployeeForm initialData={employeeData} onSubmit={handleSubmit} />
    </div>
  )
}