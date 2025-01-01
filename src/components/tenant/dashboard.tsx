'use client'

import React, { useState, useEffect } from 'react'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { Typography, Box, TextField, Button, IconButton, Tooltip } from '@mui/material'
import { 
  Add as AddIcon, 
  Business as BusinessIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Block as BlockIcon
} from '@mui/icons-material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface DashboardProps {
  initialTenants: Tenant[]
}

export default function Dashboard({ initialTenants }: DashboardProps) {
  const [tenants, setTenants] = useState<Tenant[]>(initialTenants)
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  

  const handleEdit = (e: React.MouseEvent, id: number) => {
    e.stopPropagation()
    router.push(`/tenantRegistration/${id}`)
  }

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation()
    if (window.confirm('Are you sure you want to delete this tenant?')) {
      try {
        const response = await fetch(`/api/tenant/${id}`, { method: 'DELETE' })
        if (response.ok) {
          setTenants(tenants.filter(tenant => tenant.id !== id))
        } else {
          console.error('Failed to delete tenant')
        }
      } catch (error) {
        console.error('Error deleting tenant:', error)
      }
    }
  }

  const handleDeactivate = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation()
    if (window.confirm('Are you sure you want to deactivate this tenant?')) {
      try {
        const response = await fetch(`/api/tenant/${id}/deactivate`, { method: 'PUT' })
        if (response.ok) {
          setTenants(tenants.map(tenant => 
            tenant.id === id ? { ...tenant, active: false } : tenant
          ))
        } else {
          console.error('Failed to deactivate tenant')
        }
      } catch (error) {
        console.error('Error deactivating tenant:', error)
      }
    }
  }

  
const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'companyName', headerName: 'Company Name', width: 200 },
  { field: 'uenNo', headerName: 'UEN No', width: 150 },
  { field: 'contactNo', headerName: 'Contact No', width: 150 },
  { field: 'domain', headerName: 'Domain', width: 200 },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    renderCell: (params: GridRenderCellParams) => (
      <Box>
        <Tooltip title="Edit">
          <IconButton onClick={(e) => handleEdit(e, params.row.id)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton onClick={(e) => handleDelete(e, params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Deactivate">
          <IconButton onClick={(e) => handleDeactivate(e, params.row.id)}>
            <BlockIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  },
]

  const filteredTenants = tenants.filter(tenant =>
    tenant?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant?.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant?.uenNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant?.contactNo?.toLowerCase().includes(searchTerm.toLowerCase())
  )

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

  const handleRowClick = (params: GridRenderCellParams) => {
    router.push(`/tenant/${params.id}`)
  }

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <Box className="flex justify-between items-center my-6">
        <Typography variant="h4" component="h1" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <BusinessIcon fontSize="large" />
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
          sx={{ width: '300px' }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={Link}
          href="/tenantRegistration"
        >
          Add New Tenant
        </Button>
      </Box>
      <DataGrid
        rows={filteredTenants}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 25, 50]}
        onRowClick={()=>handleRowClick}
        sx={{
          '& .MuiDataGrid-row:hover': {
            cursor: 'pointer',
            backgroundColor: 'action.hover',
          },
        }}
      />
    </Box>
  )
}

