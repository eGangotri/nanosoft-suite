'use client'

import React, { useEffect, useState } from 'react'
import EmployeeForm, { EmployeeFormData } from '../employee-form'
import { useRouter } from 'next/navigation'

const EditEmployeePage: React.FC<{ id: string }> = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const [employeeData, setEmployeeData] = useState<EmployeeFormData | null>(null)
  console.log(`Employee ID: ${id}`)
  useEffect(() => {
    // Fetch employee data here
    // This is just a placeholder, replace with your actual API call
    const fetchData = async () => {
      const response = await fetch(`/api/employee/list?id=${id}`);
      const data: EmployeeFormData = await response.json()
      console.log('Employee data:', JSON.stringify(data))
      setEmployeeData(data)
      console.log('Fetching employee data for ID:', id)
      console.log('Fetching employee data for ID:', JSON.stringify(data))
    }
    fetchData()
  }, [id])

  const handleSubmit = async (data: EmployeeFormData) => {
    setIsLoading(true)
    setError(null)
    console.log('Submitting employee data:', JSON.stringify(data));
    try {
      const response = await fetch(`/api/employee/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to update employee')
      }

      const updatedEmployee = await response.json()
      console.log('Employee updated successfully:', updatedEmployee)

      // Update local state with the new data
      setEmployeeData(updatedEmployee)

      // Optionally, redirect to a different page or show a success message
      router.push('/employee/employee') // Redirect to employee list page
    } catch (err) {
      console.error('Error updating employee:', err)
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  if (!employeeData) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-xl font-bold mb-4">Edit Employee</h1>
      <EmployeeForm initialData={employeeData} onSubmit={handleSubmit} />
    </div>
  )
}

export default EditEmployeePage