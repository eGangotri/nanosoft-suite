'use client'

import React, { useState, useEffect } from 'react'
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid'
import { Button, Dialog, DialogTitle, DialogContent } from '@mui/material'
import { useRouter } from 'next/navigation'
import { Claim, ClaimStatus } from './ClaimSchema'
import { ClaimForm } from './ClaimForm'

export default function ClaimsListPage() {
  const [claims, setClaims] = useState<Claim[]>([])
  const [openForm, setOpenForm] = useState(false)
  const [editingClaim, setEditingClaim] = useState<Claim | null>(null)
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  })
  const router = useRouter()

  useEffect(() => {
    // Fetch claims data
    // This is a placeholder. Replace with actual API call.
    const fetchClaims = async () => {
      const response = await fetch('/api/claims')
      const data = await response.json()
      setClaims(data)
    }
    fetchClaims()
  }, [])

  const columns: GridColDef[] = [
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
      renderCell: (params) => (
        <Button disabled={params.row.status !== ClaimStatus.PENDING} onClick={() => handleEdit(params.row)}>Edit</Button>
      ),
    },
  ]

  const handleEdit = (claim: Claim) => {
    console.log(`Editing claim: ${JSON.stringify(claim)}`)
    setEditingClaim(claim)
    setOpenForm(true)
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
        router.push('/claims')
      } else {
        throw new Error(`Failed to ${id ? 'update' : 'submit'} loan application`)
      }
    } catch (error) {
      console.error(`Error ${id ? 'updating' : 'submitting'} loan application:`, error)
      // You might want to add some error handling here, e.g., showing an error message to the user
    }
    handleCloseForm()
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
    </div>
  )
}

