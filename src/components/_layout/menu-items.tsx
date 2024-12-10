import React from 'react'
import {
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
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
import { NANOSOFT_ROLES } from '@/globalConstants'
import { isAdminOrSuperAdmin } from '@/utils/utils'

export interface MenuItem {
  text: string
  icon: React.ReactNode
  route?: string
  subItems?: MenuItem[]
}

export const menuItems: MenuItem[] = [
  {
    text: 'Dashboard',
    icon: <DashboardIcon />,
    route: '/dashboard/admin-dashboard'
  },
  { text: 'Employee-Data', icon: <PeopleIcon />, route: '/employee/employee' },
  { text: 'Leave-Types-Mgmt', icon: <PeopleIcon />, route: '/leaves-type/' },
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
  { text: 'Settings', icon: <SettingsIcon />, route: '/settings' },
]

export const menuItemsForEmployee: MenuItem[] = [
  {
    text: 'Dashboard',
    icon: <DashboardIcon />,
    route: '/dashboard/employee-dashboard'
  },
  { text: 'Apply-Leave', icon: <PeopleIcon />, route: '/leaves/' },

]

export const getMenuItemsForRole = (role: string): MenuItem[] => {
  if (isAdminOrSuperAdmin(role)) {
    return menuItems
  }
  if (role === NANOSOFT_ROLES.EMPLOYEE) {
    return menuItemsForEmployee
  }
  if (role === NANOSOFT_ROLES.SUPERVISOR) {
    return menuItems.filter(item => item.text === 'Leave-Mgmt')
  }
  // For other roles, remove the Settings menu item
  return menuItems.filter(item => item.text !== 'Settings')
}