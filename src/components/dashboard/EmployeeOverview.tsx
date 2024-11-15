'use client';

import React, { useEffect, useState } from 'react';
import { Typography, Paper, CircularProgress } from '@mui/material';
import { Employee } from '@prisma/client';

const EmployeeOverview: React.FC = () => {
  const [loadingStates, setLoadingStates] = useState<{ [key: number | string]: boolean }>({})
  const [employees, setEmployees] = useState<Employee[]>([])
  let employeeCount = 0;
  let employeeOnLeaveCount = 0;
  let employeeActiveCount = 0;

  const fetchEmployees = async () => {
    try {
      setLoading(`employee`, true);
      const response = await fetch('/api/employee/list')
      if (!response.ok) {
        throw new Error('Failed to fetch employees')
      }
      const data = await response.json()
      setEmployees(data.employees)
      employeeCount = employees.length;
      employeeOnLeaveCount = 0;
      employeeActiveCount = employees.filter(employee => employee.active === true).length;
      console.log('Employees:', JSON.stringify(data))
      console.log('employees:', JSON.stringify(employees))
      setLoading(`employee`, false);
    } catch (error) {
      console.error('Error fetching employees:', error)
      setLoading(`list`, false);
    }
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  const setLoading = (id: number | string, isLoading: boolean) => {
    setLoadingStates(prev => ({ ...prev, [id]: isLoading }))
  }

  return (
    <Paper className="p-4 rounded-lg shadow">
      {loadingStates[`employee`] ?
        <div className="flex justify-center items-center h-80vh">
          <CircularProgress size={24} />
        </div> : null}
      <Typography variant="h6" className="mb-2">Employee Overview</Typography>
      <Typography>Total Employees: {employees.length}</Typography>
      <Typography>Active: {employees.filter(employee => employee.active === true).length}</Typography>
      <Typography>On Leave: {employeeOnLeaveCount}</Typography>
    </Paper>
  );
};

export default EmployeeOverview;