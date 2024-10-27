'use client'

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Box, CssBaseline, useTheme, useMediaQuery, Button, Collapse } from '@mui/material'
import { Menu as MenuIcon, Dashboard as DashboardIcon, Settings as SettingsIcon, ExpandLess, ExpandMore, Apps as ProductsIcon, AttachMoney as PayrollIcon, EventNote as LeaveIcon, ReceiptLong as ClaimIcon, Group as EmployeeIcon, AccessTime as TimesheetIcon, CalendarToday as SchedulingIcon, PhoneAndroid as MobileIcon, Fingerprint as BiometricsIcon, Assessment as PerformanceIcon, PersonSearch as ApplicantIcon, School as LMSIcon, BarChart as ReportsIcon } from '@mui/icons-material'
import Image from 'next/image'
import { signOut } from 'next-auth/react'

const drawerWidth = 240

export default function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState('Dashboard')
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

  const handleProductsClick = () => {
    setProductsOpen(!productsOpen)
  }

  const handleMenuClick = (menuText: string) => {
    setSelectedMenu(menuText)
    if (isMobile) {
      setMobileOpen(false)
    }
  }

  const isAdminOrSuperAdmin = session?.user?.role === 'ADMIN' || session?.user?.role === 'SUPERADMIN'

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon /> },
    {
      text: 'Products',
      icon: <ProductsIcon />,
      subItems: [
        { text: 'Payroll Mgmt', icon: <PayrollIcon /> },
        { text: 'Leave Management', icon: <LeaveIcon /> },
        { text: 'Claim Management', icon: <ClaimIcon /> },
        { text: 'Employee Database', icon: <EmployeeIcon /> },
        { text: 'Timesheet and Attendance', icon: <TimesheetIcon /> },
        { text: 'Scheduling and Shifts', icon: <SchedulingIcon /> },
        { text: 'Mobile and Tablet Apps', icon: <MobileIcon /> },
        { text: 'Biometrics', icon: <BiometricsIcon /> },
        { text: 'Performance Appraisals', icon: <PerformanceIcon /> },
        { text: 'Applicant Tracking System', icon: <ApplicantIcon /> },
        { text: 'LMS', icon: <LMSIcon /> },
        { text: 'Reports and Analytics', icon: <ReportsIcon /> },
      ]
    },
    ...(isAdminOrSuperAdmin ? [{ text: 'Settings', icon: <SettingsIcon /> }] : []),
  ]

  const drawer = (
    <div>
      <div className="p-4 flex justify-center">
        <Image src="/logo-placeholder.svg" alt="NanoSoft Suite Logo" width={150} height={50} />
      </div>
      <List>
        {menuItems.map((item) => (
          <React.Fragment key={item.text}>
            <ListItem 
              button 
              onClick={item.text === 'Products' ? handleProductsClick : () => handleMenuClick(item.text)}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
              {item.text === 'Products' && (productsOpen ? <ExpandLess /> : <ExpandMore />)}
            </ListItem>
            {item.subItems && (
              <Collapse in={productsOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.subItems.map((subItem) => (
                    <ListItem 
                      button 
                      key={subItem.text} 
                      sx={{ pl: 4 }}
                      onClick={() => handleMenuClick(subItem.text)}
                    >
                      <ListItemIcon>
                        {subItem.icon}
                      </ListItemIcon>
                      <ListItemText primary={subItem.text} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </div>
  )

  const renderContent = () => {
    switch (selectedMenu) {
      case 'Dashboard':
        return (
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
        )
      case 'Settings':
        if (!isAdminOrSuperAdmin) {
          return (
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
              <p>You do not have permission to view this page.</p>
            </div>
          )
        }
        return (
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <p>Configure your NanoSoft Suite settings here.</p>
          </div>
        )
      default:
        return (
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">{selectedMenu}</h2>
            <p>Content for {selectedMenu} goes here.</p>
          </div>
        )
    }
  }

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'unauthenticated') {
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
          <Typography variant="body1" sx={{ mr: 2 }}>
            {session?.user?.name} ({session?.user?.role})
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
        <Typography variant="h4" gutterBottom>
          {selectedMenu}
        </Typography>
        {renderContent()}
      </Box>
    </Box>
  )
}