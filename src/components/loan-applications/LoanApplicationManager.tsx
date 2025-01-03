import React from 'react'
import { Typography, Paper, Box } from '@mui/material'
import LoanApplicationForm from './LoanApplicationForm'

interface LoanApplicationManagerProps {
  id?: string
}

export default function LoanApplicationManager({ id }: LoanApplicationManagerProps) {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {id ? 'Edit Loan Application' : 'Apply for a Loan'}
      </Typography>
      <Box sx={{ mt: 2 }}>
        <LoanApplicationForm id={id} />
      </Box>
    </Paper>
  )
}

