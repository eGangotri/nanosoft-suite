'use client'

import React, { useState, useEffect } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Typography, Box } from '@mui/material'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'companyName', headerName: 'Company Name', width: 200 },
  { field: 'uenNo', headerName: 'UEN No', width: 150 },
  { field: 'entityType', headerName: 'Entity Type', width: 150 },
  { field: 'industry', headerName: 'Industry', width: 150 },
  { field: 'contactNo', headerName: 'Contact No', width: 150 },
  { field: 'domain', headerName: 'Domain', width: 200 },
  { 
    field: 'createdAt', 
    headerName: 'Created At', 
    width: 200,
    valueGetter: (params:{value:string}) => new Date(params.value).toLocaleString(),
  },
]

interface DashboardProps {
  initialTenants: Tenant[]
}

export default function Dashboard({ initialTenants }: DashboardProps) {
  const [tenants, setTenants] = useState<Tenant[]>(initialTenants)

  useEffect(() => {
    const eventSource = new EventSource('/api/tenant/stream')

    eventSource.onmessage = (event) => {
      const newTenant = JSON.parse(event.data)
      setTenants((prevTenants) => {
        const existingTenantIndex = prevTenants.findIndex(tenant => tenant.id === newTenant.id)
        if (existingTenantIndex !== -1) {
          // Update existing tenant
          const updatedTenants = [...prevTenants]
          updatedTenants[existingTenantIndex] = newTenant
          return updatedTenants
        } else {
          // Add new tenant
          return [...prevTenants, newTenant]
        }
      })
    }

    return () => {
      eventSource.close()
    }
  }, [])

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Tenant Dashboard
      </Typography>
      <DataGrid
        rows={tenants}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 25, 50]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  )
}

