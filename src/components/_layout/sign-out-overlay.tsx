'use client'

import React from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'

export default function SignOutOverlay() {
  return (
    <Box className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <Box className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
        <CircularProgress size={60} />
        <Typography variant="h6" className="mt-2">
          Signing out...
        </Typography>
      </Box>
    </Box>
  )
}