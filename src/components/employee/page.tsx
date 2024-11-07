'use client'

import React, { useState, useEffect } from 'react'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button, 
  IconButton, 
  Typography,
  Box
} from '@mui/material'
import { Edit as EditIcon, Delete as DeleteIcon, Block as DeactivateIcon } from '@mui/icons-material'
import Link from 'next/link'

interface Employee {
  id: number
  firstName: string
  lastName: string
  designation: string
  email: string
  mobile: string
  citizenship_status: string
}

export default function EmployeeListPage() {
  const [employees, setEmployees] = useState<Employee[]>([])

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('/api/employee/list')
        if (!response.ok) {
          throw new Error('Failed to fetch employees')
        }
        const data = await response.json()
        setEmployees(data.employees)
        console.log('Employees:', JSON.stringify(data))
        console.log('employees:', JSON.stringify(employees))
      } catch (error) {
        console.error('Error fetching employees:', error)
      }
    }

    fetchEmployees()
  }, [])

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        const response = await fetch(`/api/employee/${id}`, { method: 'DELETE' })
        if (!response.ok) {
          throw new Error('Failed to delete employee')
        }
        setEmployees(employees.filter(emp => emp.id !== id))
      } catch (error) {
        console.error('Error deleting employee:', error)
      }
    }
  }

  const handleDeactivate = async (id: number) => {
    if (window.confirm('Are you sure you want to deactivate this employee?')) {
      try {
        const response = await fetch(`/api/employee/${id}/deactivate`, { method: 'POST' })
        if (!response.ok) {
          throw new Error('Failed to deactivate employee')
        }
        // Refresh the employee list after deactivation
        const updatedEmployees = await fetch('/api/employee/list').then(res => res.json())
        setEmployees(updatedEmployees)
      } catch (error) {
        console.error('Error deactivating employee:', error)
      }
    }
  }

  return (
    <Box className="container mx-auto px-4 py-8">
      <Box className="flex justify-between items-center mb-6">
        <Typography variant="h4" component="h1">Employee List</Typography>
        <Link href="/employee/add-employee" passHref>
          <Button variant="contained" color="primary">Add New Employee</Button>
        </Link>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="employee table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Citizenship Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{`${employee.firstName} ${employee.lastName}`}</TableCell>
                <TableCell>{employee.designation}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.mobile}</TableCell>
                <TableCell>{employee.citizenship_status}</TableCell>
                <TableCell>
                  <Link href={`/employee/edit-employee?id=${employee.id}`} passHref>
                    <IconButton aria-label="edit" color="primary">
                      <EditIcon />
                    </IconButton>
                  </Link>
                  <IconButton aria-label="delete" color="error" onClick={() => handleDelete(employee.id)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton aria-label="deactivate" color="warning" onClick={() => handleDeactivate(employee.id)}>
                    <DeactivateIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}