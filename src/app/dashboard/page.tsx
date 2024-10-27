'use client'

import React, { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Box, CssBaseline, useTheme, useMediaQuery, Button, Collapse, Modal, CircularProgress } from '@mui/material'
import { Menu as MenuIcon, Dashboard as DashboardIcon, Settings as SettingsIcon, ExpandLess, ExpandMore, Apps as ProductsIcon, AttachMoney as PayrollIcon, EventNote as LeaveIcon, ReceiptLong as ClaimIcon, Group as EmployeeIcon, AccessTime as TimesheetIcon, CalendarToday as SchedulingIcon, PhoneAndroid as MobileIcon, Fingerprint as BiometricsIcon, Assessment as PerformanceIcon, PersonSearch as ApplicantIcon, School as LMSIcon, BarChart as ReportsIcon } from '@mui/icons-material'
import Image from 'next/image'

// Import your components here
import DashboardContent from '@/components/dashboard/DashboardContent'
import PayrollManagement from '@/components/products/PayrollManagement'
import LeaveManagement from '@/components/products/LeaveManagement'
import ClaimManagement from '@/components/products/ClaimManagement'
import EmployeeDatabase from '@/components/products/EmployeeDatabase'
import TimesheetAttendance from '@/components/products/TimesheetAttendance'
import SchedulingShifts from '@/components/products/SchedulingShifts'
import MobileTabletApps from '@/components/products/MobileTabletApps'
import Biometrics from '@/components/products/Biometrics'
import PerformanceAppraisals from '@/components/products/PerformanceAppraisals'
import ApplicantTrackingSystem from '@/components/products/ApplicantTrackingSystem'
import LMS from '@/components/products/LMS'
import ReportsAnalytics from '@/components/products/ReportsAnalytics'
import Settings from '@/components/Settings'

const drawerWidth = 240

export default function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState('Dashboard')
  const [isSigningOut, setIsSigningOut] = useState(false)
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

  const handleSignOut = async () => {
    setIsSigningOut(true)
    await signOut({ callbackUrl: '/login' })
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
              component={item.text === 'Products' ? 'div' : 'a'}
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
                      component={subItem.text === 'Settings' ? 'div' : 'a'} 
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
        return <DashboardContent />
      case 'Payroll Mgmt':
        return <PayrollManagement />
      case 'Leave Management':
        return <LeaveManagement />
      case 'Claim Management':
        return <ClaimManagement />
      case 'Employee Database':
        return <EmployeeDatabase />
      case 'Timesheet and Attendance':
        return <TimesheetAttendance />
      case 'Scheduling and Shifts':
        return <SchedulingShifts />
      case 'Mobile and Tablet Apps':
        return <MobileTabletApps />
      case 'Biometrics':
        return <Biometrics />
      case 'Performance Appraisals':
        return <PerformanceAppraisals />
      case 'Applicant Tracking System':
        return <ApplicantTrackingSystem />
      case 'LMS':
        return <LMS />
      case 'Reports and Analytics':
        return <ReportsAnalytics />
      case 'Settings':
        if (!isAdminOrSuperAdmin) {
          return (
            <Typography variant="h6" color="error">Access Denied: You do not have permission to view this page.</Typography>
          )
        }
        return <Settings />
      default:
        return <Typography variant="h6">Select a menu item to view content.</Typography>
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
      <Modal
        open={isSigningOut}
        aria-labelledby="sign-out-modal"
        aria-describedby="modal-modal-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ 
          bgcolor: 'background.paper', 
          boxShadow: 24, 
          p: 4, 
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <CircularProgress size={60} />
          <Typography id="sign-out-modal" variant="h6" sx={{ mt: 2 }}>
            Signing out...
          </Typography>
        </Box>
      </Modal>
    </Box>
  )
}