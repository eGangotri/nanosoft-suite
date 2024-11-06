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
import Footer from './footer'

import {
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  ExpandLess, ExpandMore,
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
import { getChosenGeoFence } from '@/utils/geofence'
import EmployeeListPage from '@/components/hr/list'

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
      { text: 'Dashboard', icon: <DashboardIcon /> },
      { text: 'HR Mgmt', icon: <PeopleIcon /> },
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
        className={`z-[1201] transition-all duration-300 ease-in-out w-full`}
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
          <Typography variant="h6" noWrap component="div" className="flex-grow">
            Dashboard
          </Typography>
          <Typography variant="body1" className="mr-2">
            {session?.user?.name} ({session?.user?.role})
          </Typography>
          <Button color="inherit" onClick={handleSignOut}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
      <Box className="flex flex-grow" sx={{ marginTop: '64px' }}>
        <Drawer
          variant="permanent"
          open={sidebarOpen}
          sx={{
            width: sidebarOpen ? drawerWidth : 64,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: sidebarOpen ? drawerWidth : 64,
              boxSizing: 'border-box',
              overflowX: 'hidden',
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            },
          }}
        >
          <Toolbar />
          {drawer}
        </Drawer>
        <Box
          component="main"
          className="flex-grow p-3"
          sx={{
            marginLeft: sidebarOpen ? 0 : `-${drawerWidth - 64}px`,
            transition: theme.transitions.create('margin', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }}
        >
          <Toolbar />
          <Typography variant="h4" gutterBottom>
            {selectedMenu}
          </Typography>
          {children}
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
      <Footer />
    </Box>
  )
}