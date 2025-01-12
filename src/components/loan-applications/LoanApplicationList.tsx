import React, { useState, useEffect } from 'react'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { Button, Typography, Box, Tooltip, IconButton } from '@mui/material'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
    Add as AddIcon,
    Edit as EditIcon,
    CheckCircle as ApproveIcon,
    Cancel as DeclineIcon
}
    from '@mui/icons-material'

import { LoanStatus } from './LoanApplicationSchema'
import { isAnyManagerialRole } from '@/utils/utils';
import { useRecoilValue } from 'recoil'
import { loggedUserRole } from '../recoilConsts'
import { LoanApplication } from '@prisma/client'

export default function LoanApplicationList() {
    const [applications, setApplications] = useState<LoanApplication[]>([])
    const [loading, setLoading] = useState(true)
    const router = useRouter();
    const __loggedUserRole = useRecoilValue(loggedUserRole);

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
        { field: 'employeeName', headerName: 'Employee', width: 120 },
        {
            field: 'amount', headerName: 'Amount', width: 150,
            renderCell: (params: GridRenderCellParams) => {
                return (<Typography>{params.row.amount.toFixed(2)}</Typography>);
            }
        },
        { field: 'reason', headerName: 'Reason', width: 200 },
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
            width: 250,
            renderCell: (params) => {
                const loan = params.row as LoanApplication
                return (
                    <>
                        <Tooltip title="Edit">
                            <IconButton
                                onClick={() => router.push(`/loans/edit/${params.row.id}`)}
                                disabled={loan.status !== LoanStatus.PENDING}
                            >
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        {(params.row.status === LoanStatus.PENDING && isAnyManagerialRole(__loggedUserRole)) && (
                            <>
                                <Tooltip title="Approve">
                                    <IconButton
                                        onClick={() => handleAction(loan.id, 'approve')}
                                        disabled={loan.status !== LoanStatus.PENDING}
                                        color="success"
                                    >
                                        <ApproveIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Decline">
                                    <IconButton
                                        onClick={() => handleAction(loan.id, 'decline')}
                                        disabled={loan.status !== LoanStatus.PENDING}
                                        color="error"
                                    >
                                        <DeclineIcon />
                                    </IconButton>
                                </Tooltip>
                            </>
                        )}
                    </>
                )
            },
        },
    ]

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <Typography variant="h4" gutterBottom>
                Loan Applications
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
                <Button variant="contained" startIcon={<AddIcon />}>
                    <Link href="/loans/apply" passHref>
                        Apply for New Loan
                    </Link>
                </Button>
            </Box>
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

