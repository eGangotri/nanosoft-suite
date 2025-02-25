import React from 'react'
import {
  Dashboard as DashboardIcon,
  Business as BusinessIcon,
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
  People as PeopleIcon,
  FactCheck as FactCheckIcon,
  Description as DescriptionIcon,
  Receipt as ReceiptIcon,
  ReceiptLong as ReceiptLongIcon,
  AccountCircle as AccountCircleIcon,
  AssignmentInd as AssignmentIndIcon
} from '@mui/icons-material'

import { NANOSOFT_ROLES } from '@/globalConstants'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

export interface MenuItem {
  text: string
  icon: React.ReactNode
  route?: string
  subItems?: MenuItem[]
}

export const menuItemsForAdmin: MenuItem[] = [
  {
    text: 'Dashboard',
    icon: <DashboardIcon />,
    route: '/'
  },
  { text: 'Employee-Data', icon: <PeopleIcon />, route: '/employee/employee' },
  {
    text: 'User-Dashboard',
    icon: <AccountCircleIcon />,
    route: '/users'
  },
  { text: 'Leave-Types-Mgmt', icon: <PeopleIcon />, route: '/leaves-type/' },
  { text: 'Gen-Confirmation-Letter', icon: <FactCheckIcon />, route: '/letters/gen-confirmation-letter/' },
  { text: 'Gen-Offer-Letter', icon: <DescriptionIcon />, route: '/letters/get-offer-letter/' },

  {
    text: 'Claims',
    icon: <ReceiptLongIcon />,
    route: '/claims'
  },
  {
    text: 'Loans',
    icon: <AccountBalanceIcon />,
    subItems: [
      { text: 'Loans Mgmt', icon: <AccountBalanceIcon />, route: '/loans/manage' },
      { text: 'Loans List', icon: <LMSIcon />, route: '/products/lms' },
      { text: 'Reports and Analytics', icon: <ReportsIcon />, route: '/products/reports' },
    ]
  },
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
    route: '/'
  },
  { text: 'Apply-Leave', icon: <PeopleIcon />, route: '/leaves/' },
  { text: 'Payslip', icon: <ReceiptIcon />, route: '/payslips/' },
  {
    text: 'Loans',
    icon: <AccountBalanceIcon />,
    subItems: [
      { text: 'Loans Mgmt', icon: <AccountBalanceIcon />, route: '/loans/manage' },
      { text: 'Loans List', icon: <LMSIcon />, route: '/products/lms' },
      { text: 'Reports and Analytics', icon: <ReportsIcon />, route: '/products/reports' }
    ]
  },
  {
    text: 'Claims',
    icon: <ReceiptLongIcon />,
    route: '/claims'
  }

]

export const menuItemsForSuperAdmin: MenuItem[] = [
  {
    text: 'Tenant-Dashboard',
    icon: <BusinessIcon />,
    route: '/tenant/dashboard'
  },
  
  {
    text: 'Roles',
    icon: <AssignmentIndIcon />,
    route: '/roles'
  },
  
  {
    text: 'User-Dashboard',
    icon: <AccountCircleIcon />,
    route: '/users'
  },

  { text: 'Settings', icon: <SettingsIcon />, route: '/settings' },

]
export const getMenuItemsForRole = (role: string): MenuItem[] => {
  if (role === NANOSOFT_ROLES.SUPERADMIN) {
    return menuItemsForSuperAdmin
  }
  if (role === NANOSOFT_ROLES.ADMIN) {
    return menuItemsForAdmin
  }
  if (role === NANOSOFT_ROLES.EMPLOYEE) {
    return menuItemsForEmployee
  }
  if (role === NANOSOFT_ROLES.SUPERVISOR) {
    return menuItemsForAdmin.filter(item => item.text === 'Leave-Mgmt')
  }
  // For other roles, remove the Settings menu item
  return menuItemsForAdmin.filter(item => item.text !== 'Settings')
}
