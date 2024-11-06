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
  useMediaQuery,
  Button,
  Collapse,
  CircularProgress
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
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

interface MenuItem {
  text: string
  icon: ReactNode
  subItems?: MenuItem[]
  route?: string
}

const DRAWER_OPEN_WIDTH = '240px'
const DRAWER_CLOSED_WIDTH = '64px'
const SIDEBAR_WIDTH_OPEN = 'w-60'
const SIDEBAR_WIDTH_CLOSED = 'w-16'
// : 
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
    { text: 'HR Mgmt', icon: <PeopleIcon />, route: '/employee' },
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
    <div className={`transition-all duration-300 ease-in-out ${sidebarOpen ? SIDEBAR_WIDTH_OPEN : SIDEBAR_WIDTH_CLOSED} overflow-hidden`}>
      <List>
        {menuItems.map((item) => (
          <React.Fragment key={item.text}>
            <ListItem
              button
              component={item.route ? Link : 'div'}
              href={item.route || '#'}
              onClick={item.subItems ? handleProductsClick : () => handleMenuClick(item.text)}
              className={`transition-all duration-300 ease-in-out ${sidebarOpen ? 'px-4' : 'px-2 justify-center'}`}
            >
              <ListItemIcon className={sidebarOpen ? '' : 'min-w-0 mr-0'}>
                {item.icon}
              </ListItemIcon>
              {sidebarOpen && <ListItemText primary={item.text} />}
              {item.subItems && sidebarOpen && (productsOpen ? <ExpandLess /> : <ExpandMore />)}
            </ListItem>
            {item.subItems && sidebarOpen && (
              <Collapse in={productsOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.subItems.map((subItem) => (
                    <ListItem
                      button
                      key={subItem.text}
                      component={Link}
                      href={subItem.route || '#'}
                      onClick={() => handleMenuClick(subItem.text)}
                      className="pl-8"
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
    <Box className="flex flex-col h-screen">
      <AppBar
        position="fixed"
        className="z-[1201] transition-all duration-300 ease-in-out"
        sx={{
          width: { sm: `calc(100% - ${sidebarOpen ? {DRAWER_OPEN_WIDTH} : {DRAWER_CLOSED_WIDTH}})` },
          ml: { sm: sidebarOpen ? {DRAWER_OPEN_WIDTH} : {DRAWER_CLOSED_WIDTH} },
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
            {sidebarOpen ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <div className="p-4 flex justify-center">
            <Image src="/logo.png" alt="Company Logo" width={sidebarOpen ? 150 : 40} height={50} />
          </div>
          <Typography variant="h6" noWrap component="div" className="flex-grow">
            Dashboard
          </Typography>
          <Box className="flex items-center ml-auto">
            <Typography variant="body1" className="mr-2">
              {session?.user?.name} ({session?.user?.role})
            </Typography>
            <Button color="inherit" onClick={handleSignOut}>
              Sign Out
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box className="flex flex-grow overflow-hidden">
        <Drawer
          variant="permanent"
          open={sidebarOpen}
          className={`transition-all duration-300 ease-in-out ${sidebarOpen ? SIDEBAR_WIDTH_OPEN : SIDEBAR_WIDTH_CLOSED
            } hidden sm:block`}
          sx={{
            '& .MuiDrawer-paper': {
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              width: sidebarOpen ? {DRAWER_OPEN_WIDTH} : {DRAWER_CLOSED_WIDTH},
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
            keepMounted: true,
          }}
          className="block sm:hidden"
          sx={{
            '& .MuiDrawer-paper': { width: {DRAWER_OPEN_WIDTH} },
          }}
        >
          {drawer}
        </Drawer>
        <Box
          component="main"
          className={`flex-grow p-3 flex flex-col transition-all duration-300 ease-in-out ${sidebarOpen ? 'sm:ml-60' : 'sm:ml-16'
            } overflow-auto`}
        >
          <Toolbar />
          <Box className="flex-grow">
            <span>{children}</span>
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
        className={`bg-gray-200 p-4 text-center bottom-0 right-0 transition-all duration-300 ease-in-out ${sidebarOpen ? 'sm:ml-60' : 'sm:ml-16'
          }`}
      >
        <Typography variant="body2">
          © 2024 Nanosoft. All rights reserved.
        </Typography>
      </Box>
    </Box>
  )
}