'use client'

import React, { useState, useEffect } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Typography, Box, TextField, Button } from '@mui/material'
import {
  Add as AddIcon
}
  from '@mui/icons-material';

import Link from 'next/link'

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
    valueGetter: (params: { value: string }) => new Date(params.value).toLocaleString(),
  },
]

interface DashboardProps {
  initialTenants: Tenant[]
}

export default function Dashboard({ initialTenants }: DashboardProps) {
  const [tenants, setTenants] = useState<Tenant[]>(initialTenants)
  const [searchTerm, setSearchTerm] = useState('');

  let fileteredTenants = tenants.filter(tenants =>
    tenants?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenants?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenants?.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenants?.uenNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenants?.contactNo?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <Box className="flex justify-between items-center my-6">
        <Typography variant="h4" component="h1">
          Tenant Dashboard
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <TextField
          label="Search Tenants"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="contained" startIcon={<AddIcon />}>
          <Link href="/tenantRegistration" passHref>
            Add New Tenant
          </Link>
        </Button>
      </Box>
      <DataGrid
        rows={fileteredTenants}
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

