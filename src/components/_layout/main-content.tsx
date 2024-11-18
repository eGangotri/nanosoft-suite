'use client'

import React from 'react'
import { Box, Toolbar } from '@mui/material'

interface MainContentProps {
  sidebarOpen: boolean
  children: React.ReactNode
}

export default function MainContent({ sidebarOpen, children }: MainContentProps) {
  return (
    <Box
      component="main"
      role="main"
      className={`flex-grow p-3 flex flex-col transition-all duration-300 ease-in-out ${
        sidebarOpen ? 'sm:ml-60' : 'sm:ml-16'
      } overflow-auto`}
    >
      <Toolbar />
      <Box className="flex-grow">
        <span className="abc">{children}</span>
      </Box>
    </Box>
  )
}