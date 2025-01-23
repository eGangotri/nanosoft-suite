'use client'

import React, { useState, useEffect } from 'react'
import {
    DataGrid,
    GridColDef,
    GridRenderCellParams,
    GridPaginationModel,
    GridValidRowModel,
    GridRowClassNameParams
} from '@mui/x-data-grid'
import {
    Button,
    IconButton,
    Tooltip,
    Typography,
    Box,
    Paper,
    TextField,
    CircularProgress
} from '@mui/material';

import {
    Add as AddIcon,
    Business as BusinessIcon,
    Edit as EditIcon,
    Person as PersonIcon,
    Delete as DeleteIcon,
    Block as BlockIcon,
    PersonAdd as PersonAddIcon,
    FilterList as FilterListIcon,
    Block as DeactivateIcon,
    Restore as ActivateIcon,
} from '@mui/icons-material'
import { useRecoilValue } from 'recoil'
import { loggedUserRole } from '../recoilConsts'
import { isAnyManagerialOrAdminRole } from '@/utils/utils'
import Link from 'next/link'
import { StyledDataGrid } from '../employee/constants'
import { capitalizeFirstLetter } from '@/utils/StringUtils'
import { useRouter } from 'next/navigation'

interface ExtendedUser extends User {
    id: string
    tenantId: number,
    tenantName: string,
    role: Role,
    employeeName: string,
    employeeId: string
    roleName: string;

}

export default function UserListingPage() {
    const [users, setUsers] = useState<ExtendedUser[]>([])
    const [loadingStates, setLoadingStates] = useState<{ [key: number | string]: boolean }>({})

    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        page: 0,
        pageSize: 5,
    })
    const __loggedUserRole = useRecoilValue(loggedUserRole);
    const [searchTerm, setSearchTerm] = useState('');

    const router = useRouter()

    const filteredUsers = users.filter(user =>
        user?.tenantName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user?.roleName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user?.employeeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    )


    const fetchUsers = async () => {
        try {
            setLoading(`list`, true);
            const response = await fetch('/api/users')
            if (!response.ok) {
                throw new Error('Failed to fetch users')
            }
            const data = await response.json()
            setUsers(data)
        } catch (error) {
            console.error('Error fetching users:', error)
        } finally {
            setLoading(`list`, false);
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const columns: GridColDef[] = [
        { field: 'tenantName', headerName: 'Tenant Name', width: 120 },
        { field: 'roleName', headerName: 'Role', width: 120 },
        { field: 'employeeName', headerName: 'Connected Employee', width: 200 },
        { field: 'name', headerName: 'User-Name', width: 150 },
        { field: 'email', headerName: 'User-Email', width: 200 },
        {
            field: 'emailVerified',
            headerName: 'Email Verified',
            width: 100,
            renderCell: (params) => {
                return params.row.emailVerified ? 'Yes' : 'No'
            },
        },
        {
            field: 'createdAt',
            headerName: 'Created At',
            width: 100,
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
                    <Tooltip title="View">
                        <Link href={`/employee/employee/view-employee/${params?.row?.id}`} passHref>
                            <IconButton aria-label="view" color="primary"
                                disabled={(!isAnyManagerialOrAdminRole(__loggedUserRole))}>
                                <PersonIcon />
                            </IconButton>
                        </Link>
                    </Tooltip>
                    <Tooltip title="Edit">
                        <Link href={`/users/addEdit/${params?.row?.id}`} passHref>
                            <IconButton aria-label="edit" color="primary">
                                <EditIcon />
                            </IconButton>
                        </Link>
                    </Tooltip>
                    <Tooltip title="Activate/Deactivate">
                        {params?.row?.active ?
                            <IconButton aria-label="deactivate" color="warning"
                                onClick={() => handleActivation(params?.row?.id, false)}
                                disabled={loadingStates[`deactivate-${params?.row?.id}`]}
                            >
                                {loadingStates[`deactivate-${params?.row?.id}`] ? <CircularProgress size={24} /> :
                                    <DeactivateIcon className="h-4 w-4" />
                                }
                            </IconButton>
                            :
                            <IconButton aria-label="reactivate" color="success"
                                disabled={loadingStates[`reactivate-${params?.row?.id}`]}
                                onClick={() => handleActivation(params?.row?.id, true)}
                            >
                                {loadingStates[`reactivate-${params?.row?.id}`] ? <CircularProgress size={24} /> :
                                    <ActivateIcon className="h-4 w-4" />
                                }
                            </IconButton>
                        }
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton
                            aria-label="delete"
                            color="error"
                            onClick={() => handleDelete(params?.row?.id)}
                            disabled={loadingStates[`del-${params?.row?.id}`] || !isAnyManagerialOrAdminRole(__loggedUserRole)}
                        >
                            {loadingStates[`del-${params?.row?.id}`] ? <CircularProgress size={24} /> : <DeleteIcon />}

                        </IconButton>
                    </Tooltip>
                </Box >
            ),
        },
    ]


    const setLoading = (id: number | string, isLoading: boolean) => {
        setLoadingStates(prev => ({ ...prev, [id]: isLoading }))
    }

    const handleAddUser = () => {
        router.push(`/users/addEdit/`)
    }
    
    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            setLoading(`del-${id}`, true)
            try {
                const response = await fetch(`/api/employee/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ deleted: true }),
                })
                setLoading(`del-${id}`, false)
                if (!response.ok) {
                    console.error('Error deleting employee:', response.statusText)
                    throw new Error('Failed to delete employee')
                }
                fetchUsers()
                //  filteredUsers = users.filter(emp => emp.id !== id)
                window.alert(`Deletion Successful`)
            } catch (error) {
                setLoading(`del-${id}`, false)
                window.alert(`Error deleting employee:${error}`)
                console.error('Error deleting employee:', error)
            }
        }
    }

    const handleActivation = async (employeeId: number, activate = false) => {
        const action = activate ? 'reactivate' : 'deactivate'
        if (window.confirm(`Are you sure you want to ${action} this employee?`)) {
            setLoading(`${action}-${employeeId}`, true)
            try {
                const response = await fetch(`/api/employee/${employeeId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ active: activate }),
                })
                setLoading(`${action}-${employeeId}`, false)
                if (!response.ok) {
                    console.error('Error changing active status:', response.statusText)
                    throw new Error('Failed changing active status')
                }
                window.alert(`${capitalizeFirstLetter(action)} Successful`);
                fetchUsers()

            } catch (error) {
                setLoading(`${action}-${employeeId}`, false)
                window.alert(`Error changing active status for employee:${error}`)
                console.error('Error changing active status for employee:', error)
            }
        }
    }




    return (
        <Paper elevation={3} sx={{ p: 3, m: 2 }}>
            <Box className="flex justify-between items-center my-6">
                <Typography variant="h4" component="h1" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <BusinessIcon fontSize="large" />
                    User Dashboard
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                <TextField
                    label="Search Users"
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ width: '300px' }}
                />
                {(isAnyManagerialOrAdminRole(__loggedUserRole)) ?
                    <>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={handleAddUser}
                        >
                            Add User
                        </Button>
                    </> : null
                }
            </Box>
            <div style={{ height: 400 }}>
                <StyledDataGrid
                    rows={filteredUsers}
                    columns={columns}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    pageSizeOptions={[5, 10, 25]}
                    getRowClassName={(params: GridRowClassNameParams<GridValidRowModel>) =>
                        !params.row.active
                            ? 'inactive-row'
                            : params.indexRelativeToCurrentPage % 2 === 0
                                ? 'even-row'
                                : 'odd-row'
                    } />
            </div>
        </Paper>
    )
}

