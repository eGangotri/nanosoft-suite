import React, { useState, useEffect } from 'react'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { Button, Typography, Box } from '@mui/material'
import { useRouter } from 'next/navigation'

interface LoanApplication {
    id: number
    employeeId: number
    amount: number
    reason: string
    status: 'PENDING' | 'APPROVED' | 'DECLINED'
    appliedAt: string
    employeeName: string
    month: number
    year: number
}

export default function LoanApplicationList() {
    const [applications, setApplications] = useState<LoanApplication[]>([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        fetchApplications()
    }, [])

    const fetchApplications = async () => {
        try {
            const response = await fetch('/api/loan-applications')
            if (response.ok) {
                const data = await response.json()
                setApplications(data)
            } else {
                throw new Error('Failed to fetch loan applications')
            }
        } catch (error) {
            console.error('Error fetching loan applications:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleAction = async (id: number, action: 'approve' | 'decline') => {
        try {
            const response = await fetch(`/api/loan-applications/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: action === 'approve' ? 'APPROVED' : 'DECLINED' }),
            })
            if (response.ok) {
                fetchApplications()
            } else {
                throw new Error(`Failed to ${action} loan application`)
            }
        } catch (error) {
            console.error(`Error ${action}ing loan application:`, error)
        }
    }

    const columns: GridColDef[] = [
        { field: 'employeeName', headerName: 'Employee', width: 200 },
        { field: 'amount', headerName: 'Amount', width: 150, 
            renderCell: (params: GridRenderCellParams) => {
                return (<Typography>{params.row.toFixed(2)}</Typography>);
            }
        },
        { field: 'reason', headerName: 'Reason', width: 300 },
        { field: 'status', headerName: 'Status', width: 120 },
        {
            field: 'loanPeriod',
            headerName: 'Loan Period',
            width: 150,
            renderCell: (params: GridRenderCellParams) => {
                const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                return (<Typography>{`${monthNames[params.row.month - 1]} ${params.row.year}`}</Typography>);
            }
        },
        { field: 'appliedAt', headerName: 'Applied At', width: 200, valueFormatter: ({ value }) => new Date(value).toLocaleString() },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params: GridRenderCellParams) => (
                <Box>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => router.push(`/loans/edit/${params.row.id}`)}
                    >
                        Edit
                    </Button>
                    {params.row.status === 'PENDING' && (
                        <>
                            <Button
                                variant="contained"
                                color="success"
                                size="small"
                                onClick={() => handleAction(params.row.id, 'approve')}
                            >
                                Approve
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                size="small"
                                onClick={() => handleAction(params.row.id, 'decline')}
                            >
                                Decline
                            </Button>
                        </>
                    )}
                </Box>
            ),
        },
    ]

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <Typography variant="h4" gutterBottom>
                Loan Applications
            </Typography>
            <DataGrid
                rows={applications}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                loading={loading}
            />
        </Box>
    )
}

