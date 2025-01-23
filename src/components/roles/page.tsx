"use client"

import { useEffect, useState } from "react"
import { DataGrid, GridRenderCellParams, type GridColDef } from "@mui/x-data-grid"
import { RolesSchema, type Role } from "./schema"
import { Box, Button, CircularProgress, IconButton, Paper, TextField, Tooltip, Typography } from "@mui/material"
import { isAnyManagerialOrAdminRole, isSuperAdmin } from "@/utils/utils"
import { loggedUserRole } from "../recoilConsts"
import { useRecoilValue } from "recoil"
import {
    Add as AddIcon,
    Business as BusinessIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
} from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import Link from "next/link"

export default function RolesList() {
    const [roles, setRoles] = useState<Role[]>([]);
    const [loadingStates, setLoadingStates] = useState<{ [key: number | string]: boolean }>({})
    const __loggedUserRole = useRecoilValue(loggedUserRole);
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    const setLoading = (id: number | string, isLoading: boolean) => {
        setLoadingStates(prev => ({ ...prev, [id]: isLoading }))
    }

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this Role?')) {
            setLoading(`del-${id}`, true)
            try {
                const response = await fetch(`/api/role/${id}`, {
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
                fetchRoles()
                //  filteredUsers = users.filter(emp => emp.id !== id)
                window.alert(`Deletion Successful`)
            } catch (error) {
                setLoading(`del-${id}`, false)
                window.alert(`Error deleting employee:${error}`)
                console.error('Error deleting employee:', error)
            }
        }
    }

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "name", headerName: "Name", width: 150 },
        { field: "description", headerName: "Description", width: 200 },
        { field: "code", headerName: "Code", width: 100 },
        { field: "level", headerName: "Level", width: 100 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                <Box>
                    <Tooltip title="Edit">
                        <Link href={`/users/addEdit/${params?.row?.id}`} passHref>
                            <IconButton aria-label="edit" color="primary">
                                <EditIcon />
                            </IconButton>
                        </Link>
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

    const handleAddRole = () => {
        router.push(`/roles/addEdit/`)
    }
    
    const fetchRoles = async () => {
        try {
            const res = await fetch("/api/roles");
            const data = await res.json();
            setRoles(data);
        } catch (error) {
            console.error("Failed to fetch roles:", error);
        }
    };
    useEffect(() => {

        fetchRoles();
    }, []);


    return (
        <Paper elevation={3} sx={{ p: 3, m: 2 }}>
            <Box className="flex justify-between items-center my-6">
                <Typography variant="h4" component="h1" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    Roles
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                <TextField
                    label="Search Roles"
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ width: '300px' }}
                />
                {(isSuperAdmin(__loggedUserRole)) ?
                    <>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={handleAddRole}
                        >
                            Add Role
                        </Button>
                    </> : null
                }
            </Box>
            <div style={{ height: 400 }}>
                <DataGrid
                    rows={roles}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>
        </Paper>
    )
}
