'use client'

import React, { useState, ReactNode, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  useTheme,
  useMediaQuery,
  Button,
  Collapse,
  CircularProgress
} from '@mui/material'

import Image from 'next/image'

import {
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  ExpandLess,
  ExpandMore,
  Apps as ProductsIcon,
  AttachMoney as PayrollIcon,
  EventNote as LeaveIcon,
  ReceiptLong as ClaimIcon,
  Group as EmployeeIcon,
  AccessTime as TimesheetIcon,
  CalendarToday as SchedulingIcon,
  PhoneAndroid as MobileIcon,
  Fingerprint as BiometricsIcon,
  Assessment as PerformanceIcon,
  PersonSearch as ApplicantIcon,
  School as LMSIcon,
  BarChart as ReportsIcon,
  People as PeopleIcon
} from '@mui/icons-material'

const drawerWidth = 240

interface MenuItem {
  text: string
  icon: ReactNode
  subItems?: MenuItem[]
  route?: string
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [productsOpen, setProductsOpen] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState('Dashboard')
  const [isSigningOut, setIsSigningOut] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  useEffect(() => {
    const menuItem = menuItems.find(item => item.route === pathname) ||
      menuItems.find(item => item.subItems?.some(subItem => subItem.route === pathname))
    if (menuItem) {
      setSelectedMenu(menuItem.text)
    }
  }, [pathname])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
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
      setSidebarOpen(false)
    }
  }

  const isAdminOrSuperAdmin = session?.user?.role === 'ADMIN' || session?.user?.role === 'SUPERADMIN'

  const menuItems: MenuItem[] = [
    { text: 'Dashboard', icon: <DashboardIcon />, route: '/' },
    { text: 'HR Mgmt', icon: <PeopleIcon />, route: '/hr' },
    {
      text: 'Products',
      icon: <ProductsIcon />,
      subItems: [
        { text: 'Payroll Mgmt', icon: <PayrollIcon />, route: '/products/payroll' },
        { text: 'Leave Management', icon: <LeaveIcon />, route: '/products/leave' },
        { text: 'Claim Management', icon: <ClaimIcon />, route: '/products/claim' },
        { text: 'Employee Database', icon: <EmployeeIcon />, route: '/products/employee' },
        { text: 'Timesheet and Attendance', icon: <TimesheetIcon />, route: '/products/timesheet' },
        { text: 'Scheduling and Shifts', icon: <SchedulingIcon />, route: '/products/scheduling' },
        { text: 'Mobile and Tablet Apps', icon: <MobileIcon />, route: '/products/mobile' },
        { text: 'Biometrics', icon: <BiometricsIcon />, route: '/products/biometrics' },
        { text: 'Performance Appraisals', icon: <PerformanceIcon />, route: '/products/performance' },
        { text: 'Applicant Tracking System', icon: <ApplicantIcon />, route: '/products/applicant' },
        { text: 'LMS', icon: <LMSIcon />, route: '/products/lms' },
        { text: 'Reports and Analytics', icon: <ReportsIcon />, route: '/products/reports' },
      ]
    },
    ...(isAdminOrSuperAdmin ? [{ text: 'Settings', icon: <SettingsIcon />, route: '/settings' }] : []),
  ]

  const drawer = (
    <div>
      <div className="p-4 flex justify-center">
        <Image src="/logo.png" alt="Company Logo" width={150} height={50} />
      </div>
      <List>
        {menuItems.map((item) => (
          <React.Fragment key={item.text}>
            <ListItem
              button
              component={item.route ? Link : 'div'}
              href={item.route || '#'}
              onClick={item.subItems ? handleProductsClick : () => handleMenuClick(item.text)}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
              {item.subItems && (productsOpen ? <ExpandLess /> : <ExpandMore />)}
            </ListItem>
            {item.subItems && (
              <Collapse in={productsOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.subItems.map((subItem) => (
                    <ListItem
                      button
                      key={subItem.text}
                      sx={{ pl: 4 }}
                      component={Link}
                      href={subItem.route || '#'}
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

  if (status === 'loading') {
    return (
      <Box className="flex items-center justify-center h-screen">
        <CircularProgress />
      </Box>
    )
  }

  if (status === 'unauthenticated') {
    return null
  }

  return (
    <Box className="flex flex-col min-h-screen">
      <AppBar
        position="fixed"
        className="z-[1201] transition-all duration-300 ease-in-out"
        sx={{
          width: { sm: `calc(100% - ${sidebarOpen ? drawerWidth : 0}px)` },
          ml: { sm: `${sidebarOpen ? drawerWidth : 0}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            edge="start"
            onClick={toggleSidebar}
            className="mr-2 sm:hidden"
          >
            {sidebarOpen ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" noWrap component="div" className="flex-grow">
            Dashboard
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
            <Typography variant="body1" className="mr-2">
              {session?.user?.name} ({session?.user?.role})
            </Typography>
            <Button color="inherit" onClick={handleSignOut}>
              Sign Out
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box className="flex flex-grow">
        <Drawer
          variant="permanent"
          open={sidebarOpen}
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              width: sidebarOpen ? drawerWidth : 0,
              overflowX: 'hidden',
            },
          }}
        >
          <Toolbar />
          {drawer}
        </Drawer>
        <Drawer
          variant="temporary"
          open={sidebarOpen}
          onClose={toggleSidebar}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Box
          component="main"
          className="flex-grow p-3 flex flex-col"
          sx={{
            width: { sm: `calc(100% - ${sidebarOpen ? drawerWidth : 0}px)` },
            ml: { sm: `${sidebarOpen ? drawerWidth : 0}px` },
            transition: theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            paddingBottom: '64px', // Add padding to account for the footer
          }}
        >
          <Toolbar />
          <Typography variant="h4" gutterBottom>
            {selectedMenu}
          </Typography>
          <Box className="flex-grow">
            {children}
          </Box>
        </Box>
      </Box>
      {isSigningOut && (
        <Box className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Box className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
            <CircularProgress size={60} />
            <Typography variant="h6" className="mt-2">
              Signing out...
            </Typography>
          </Box>
        </Box>
      )}
      <Box
        component="footer"
        className="bg-gray-200 p-4 text-center"
        sx={{
          position: 'fixed',
          bottom: 0,
          left: { sm: sidebarOpen ? drawerWidth : 0 },
          right: 0,
          transition: theme.transitions.create('left', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <Typography variant="body2">
          © 2024 Nanosoft. All rights reserved.
        </Typography>
      </Box>
    </Box>
  )
}