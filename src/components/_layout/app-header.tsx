'use client'

import React from 'react'
import { AppBar, Toolbar, IconButton, Typography, Box, Button } from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'
import Image from 'next/image'

interface AppHeaderProps {
  sidebarOpen: boolean
  toggleSidebar: () => void
  session: any
  onSignOut: () => void
}

export default function AppHeader({ sidebarOpen, toggleSidebar, session, onSignOut }: AppHeaderProps) {
  return (
    <AppBar
      position="fixed"
      className="z-[1201] transition-all duration-300 ease-in-out"
      sx={{
        width: { sm: `calc(100% - ${sidebarOpen ? '240px' : '64px'})` },
        ml: { sm: sidebarOpen ? '240px' : '64px' },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="toggle drawer"
          edge="start"
          onClick={toggleSidebar}
          className="mr-2"
        >
          <MenuIcon />
        </IconButton>
        <div className="p-4 flex justify-center">
          <Image src="/images/logo.png" alt="Company Logo" width={sidebarOpen ? 150 : 40} height={50} />
        </div>
        <Typography variant="h6" noWrap component="div" className="flex-grow">
          Nanosoft-Suite Dashboard
        </Typography>
        <Box className="flex items-center ml-auto">
          <Typography variant="body1" className="mr-2">
            {session?.user?.name} ({session?.user?.role})
          </Typography>
          <Button color="inherit" onClick={onSignOut}>
            Sign Out
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}