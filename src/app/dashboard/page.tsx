'use client'

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Box, CssBaseline, useTheme, useMediaQuery, Button } from '@mui/material'
import { Menu as MenuIcon, Dashboard as DashboardIcon, People as PeopleIcon, Assignment as AssignmentIcon, Settings as SettingsIcon } from '@mui/icons-material'
import Image from 'next/image'
import { signOut } from 'next-auth/react'

const drawerWidth = 240

export default function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: '/login' })
  }

  const drawer = (
    <div>
      <div className="p-4 flex justify-center">
        <Image src="/logo-placeholder.svg" alt="NanoSoft Suite Logo" width={150} height={50} />
      </div>
      <List>
        {['Dashboard', 'Employees', 'Tasks', 'Settings'].map((text, index) => {
          return (
            <ListItem key={text} component="button">
              <ListItemIcon>
                {index === 0 && <DashboardIcon />}
                {index === 1 && <PeopleIcon />}
                {index === 2 && <AssignmentIcon />}
                {index === 3 && <SettingsIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          )
        }
        )
        }
      </List>
    </div>
  )

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    return null
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            NanoSoft Suite
          </Typography>
          <Button color="inherit" onClick={handleSignOut}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Typography paragraph>
          Welcome to NanoSoft Suite Dashboard, {session.user?.name || session.user?.email}
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-2">Employee Overview</h2>
            <p>Total Employees: 150</p>
            <p>Active: 140</p>
            <p>On Leave: 10</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-2">Task Summary</h2>
            <p>Total Tasks: 75</p>
            <p>Completed: 50</p>
            <p>In Progress: 25</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-2">Announcements</h2>
            <p>New project kickoff meeting tomorrow at 10 AM</p>
          </div>
        </div>
      </Box>
    </Box>
  )
}