'use client'

import React, { useState, useEffect } from 'react'
import {
    DataGrid,
    GridColDef,
    GridRenderCellParams,
    GridPaginationModel
} from '@mui/x-data-grid'
import {
    Button,
    IconButton,
    Tooltip,
    Typography,
    Box,
    Paper
} from '@mui/material'
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Block as BlockIcon,
    PersonAdd as PersonAddIcon,
    FilterList as FilterListIcon
} from '@mui/icons-material'

interface User {
    id: string
    name: string | null
    email: string | null
    emailVerified: string | null
    createdAt: string
    updatedAt: string
    tenantId: number,
    tenantName: string,
    role: Role,
    employeeName: string,
    employeeId: string

}

export default function UserListingPage() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        page: 0,
        pageSize: 5,
    })

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/users')
                if (!response.ok) {
                    throw new Error('Failed to fetch users')
                }
                const data = await response.json()
                setUsers(data)
            } catch (error) {
                console.error('Error fetching users:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchUsers()
    }, [])

    const columns: GridColDef[] = [
        { field: 'tenantName', headerName: 'Tenant Name', width: 120 },
        { field: 'roleName', headerName: 'Role', width: 120 },
        { field: 'employeeName', headerName: 'Connected Employee', width: 200 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
        {
            field: 'emailVerified',
            headerName: 'Email Verified',
            width: 150,
            renderCell: (params) => {
                return params.row.emailVerified ? 'Yes' : 'No'
            },
        },
        {
            field: 'createdAt',
            headerName: 'Created At',
            width: 200,
            renderCell: (params) => {
                return params.row.createdAt?.toLocaleString();
            }
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                <Box>
                    <Tooltip title="Edit">
                        <IconButton onClick={() => handleEdit(params.row.id)}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Deactivate">
                        <IconButton onClick={() => handleDeactivate(params.row.id)}>
                            <BlockIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton onClick={() => handleDelete(params.row.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            ),
        },
    ]

    const handleEdit = (id: string) => {
        console.log('Edit user:', id)
        // Implement edit functionality
    }

    const handleDeactivate = (id: string) => {
        console.log('Deactivate user:', id)
        // Implement deactivate functionality
    }

    const handleDelete = (id: string) => {
        console.log('Delete user:', id)
        // Implement delete functionality
    }

    const handleAddUser = () => {
        console.log('Add new user')
        // Implement add user functionality
    }

    const handleFilter = () => {
        console.log('Open filter dialog')
        // Implement filter functionality
    }

    return (
        <Paper elevation={3} sx={{ p: 3, m: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h4" component="h1">
                    User Management
                </Typography>
                <Box>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<FilterListIcon />}
                        onClick={handleFilter}
                        sx={{ mr: 2 }}
                    >
                        Filter
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<PersonAddIcon />}
                        onClick={handleAddUser}
                    >
                        Add User
                    </Button>
                </Box>
            </Box>
            <div style={{ height: 400 }}>
                <DataGrid
                    rows={users}
                    columns={columns}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    pageSizeOptions={[5, 10, 25]}
                    loading={loading}
                />
            </div>
        </Paper>
    )
}

