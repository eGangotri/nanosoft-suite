'use client'

import React, { useState, useEffect } from 'react'
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid'
import { Button, Dialog, DialogTitle, DialogContent, Snackbar, Alert, Tooltip, IconButton } from '@mui/material'
import { useRouter } from 'next/navigation'
import { Claim, ClaimStatus } from './ClaimSchema'
import { Claim as PrismaClaim } from '@prisma/client';
import { ClaimForm } from './ClaimForm'
import {
  Edit as EditIcon,
  CheckCircle as ApproveIcon,
  Cancel as DeclineIcon
} from '@mui/icons-material';
import { loggedUserRole } from '../recoilConsts'
import { useRecoilValue } from 'recoil'
import { isAnyManagerialRole } from '@/utils/utils'

export default function ClaimsListPage() {
  const [claims, setClaims] = useState<PrismaClaim[]>([])
  const [openForm, setOpenForm] = useState(false)
  const [editingClaim, setEditingClaim] = useState<Claim | null>(null);
  const __loggedUserRole = useRecoilValue(loggedUserRole);

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  })
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  })
  const router = useRouter()
  const fetchClaims = async () => {
    try {
      const response = await fetch('/api/claims')
      const data = await response.json()
      setClaims(data)
    } catch (error) {
      console.error('Error fetching claims:', error)
      setSnackbar({ open: true, message: 'Failed to fetch claims', severity: 'error' })
    }
  }
  useEffect(() => {
    // Fetch claims data
    // This is a placeholder. Replace with actual API call.

    fetchClaims()
  }, [])

  const columns: GridColDef[] = [
    { field: 'employeeName', headerName: 'Employee', width: 120 },
    { field: 'description', headerName: 'Description', width: 200 },
    { field: 'amount', headerName: 'Amount', width: 130, type: 'number' },
    { field: 'status', headerName: 'Status', width: 130 },
    {
      field: 'cycle',
      headerName: 'Cycle',
      width: 130,
      renderCell: (params) => `${params.row.cycleMonth}/${params.row.cycleYear}`
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => {
        const claim = params.row as Claim
        return (
          <>
            <Tooltip title="Edit">
              <IconButton
                onClick={() => handleEdit(claim)}
                disabled={claim.status !== ClaimStatus.PENDING}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            {(params.row.status === ClaimStatus.PENDING && isAnyManagerialRole(__loggedUserRole)) && (
              <>
                <Tooltip title="Approve">
                  <IconButton
                    onClick={() => handleApprove(claim)}
                    disabled={claim.status !== ClaimStatus.PENDING}
                    color="success"
                  >
                    <ApproveIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Decline">
                  <IconButton
                    onClick={() => handleDecline(claim)}
                    disabled={claim.status !== ClaimStatus.PENDING}
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

  const handleEdit = (claim: Claim) => {
    console.log(`Editing claim: ${JSON.stringify(claim)}`)
    setEditingClaim(claim)
    setOpenForm(true)
  }

  const handleApprove = async (claim: Claim) => {
    try {
      const response = await fetch(`/api/claims/${claim.id}/approve`, {
        method: 'PUT',
      })
      if (response.ok) {
        setSnackbar({ open: true, message: 'Claim approved successfully', severity: 'success' })
        fetchClaims()
      } else {
        throw new Error('Failed to approve claim')
      }
    } catch (error) {
      console.error('Error approving claim:', error)
      setSnackbar({ open: true, message: 'Failed to approve claim', severity: 'error' })
    }
  }

  const handleDecline = async (claim: Claim) => {
    try {
      const response = await fetch(`/api/claims/${claim.id}/decline`, {
        method: 'PUT',
      })
      if (response.ok) {
        setSnackbar({ open: true, message: 'Claim declined successfully', severity: 'success' })
        fetchClaims()
      } else {
        throw new Error('Failed to decline claim')
      }
    } catch (error) {
      console.error('Error declining claim:', error)
      setSnackbar({ open: true, message: 'Failed to decline claim', severity: 'error' })
    }
  }

  const handleCloseForm = () => {
    setOpenForm(false)
    setEditingClaim(null)
  }

  const handleSaveClaim = async (claim: Claim) => {
    const id = claim?.id || undefined
    console.log(`Saving claim: ${JSON.stringify(claim)}`, id ? ` (id: ${id})` : 'no id')
    try {
      const url = id ? `/api/claims/${id}` : '/api/claims'
      const method = id ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(claim),
      })
      if (response.ok) {
        setSnackbar({
          open: true,
          message: id ? 'Claim updated successfully' : 'New claim added successfully',
          severity: 'success'
        })
        handleCloseForm()
        // Refresh the claims data after a short delay
        setTimeout(() => {
          fetchClaims()
        }, 500)
      } else {
        throw new Error(`Failed to ${id ? 'update' : 'submit'} claim`)
      }
    } catch (error) {
      console.error(`Error ${id ? 'updating' : 'submitting'} claim:`, error)
      setSnackbar({
        open: true,
        message: `Failed to ${id ? 'update' : 'add'} claim`,
        severity: 'error'
      })
    }
    handleCloseForm()
  }

  const handleCloseSnackbar = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbar({ ...snackbar, open: false })
  }

  return (
    <div className="container mx-auto p-4 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Claims Management</h1>
        <Button onClick={() => setOpenForm(true)} variant="contained" className="ml-auto">
          Add New Claim
        </Button>
      </div>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={claims}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10, 25]}
        />
      </div>
      <Dialog open={openForm} onClose={handleCloseForm}>
        <DialogTitle>{editingClaim ? 'Edit Claim' : 'Add New Claim'}</DialogTitle>
        <DialogContent>
          <ClaimForm initialData={editingClaim} onSubmit={handleSaveClaim} />
        </DialogContent>
      </Dialog>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  )
}

