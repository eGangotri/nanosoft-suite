// 'use client'

// import React, { useState, ReactNode } from 'react'
// import { useSession, signOut } from 'next-auth/react'
// import { useRouter } from 'next/navigation'
// import {
//   AppBar,
//   Toolbar,
//   IconButton,
//   Typography,
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Box,
//   CssBaseline,
//   useTheme,
//   useMediaQuery,
//   Button,
//   Collapse,
//   CircularProgress
// } from '@mui/material'

// // Import your components here
// import DashboardContent from '@/components/dashboard/DashboardContent'
// import Settings from '@/components/Settings'
// import {
//   Menu as MenuIcon,
//   ChevronLeft as ChevronLeftIcon,
//   Dashboard as DashboardIcon,
//   Settings as SettingsIcon,
//   ExpandLess, ExpandMore,
//   Apps as ProductsIcon,
//   AttachMoney as PayrollIcon,
//   EventNote as LeaveIcon,
//   ReceiptLong as ClaimIcon,
//   Group as EmployeeIcon,
//   AccessTime as TimesheetIcon,
//   CalendarToday as SchedulingIcon,
//   PhoneAndroid as MobileIcon,
//   Fingerprint as BiometricsIcon,
//   Assessment as PerformanceIcon,
//   PersonSearch as ApplicantIcon,
//   School as LMSIcon,
//   BarChart as ReportsIcon,
//   People as PeopleIcon
// } from '@mui/icons-material'

// import Image from 'next/image'
// import EmployeeListPage from './hr/list'

// const drawerWidth = 240

// interface MenuItem {
//   text: string
//   icon: ReactNode
//   subItems?: MenuItem[]
// }

// export default function DashboardLayout2() {
//   const [sidebarOpen, setSidebarOpen] = useState(true)
//   const [productsOpen, setProductsOpen] = useState(false)
//   const [selectedMenu, setSelectedMenu] = useState('Dashboard')
//   const [isSigningOut, setIsSigningOut] = useState(false)
//   const theme = useTheme()
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
//   const { data: session, status } = useSession()
//   const router = useRouter()

//   React.useEffect(() => {
//     if (status === 'unauthenticated') {
//       router.push('/login')
//     }
//   }, [status, router])

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen)
//   }

//   const handleSignOut = async () => {
//     setIsSigningOut(true)
//     await signOut({ callbackUrl: '/login' })
//   }

//   const handleProductsClick = () => {
//     setProductsOpen(!productsOpen)
//   }

//   const handleMenuClick = (menuText: string) => {
//     setSelectedMenu(menuText)
//     if (isMobile) {
//       setSidebarOpen(false)
//     }
//   }

//   const isAdminOrSuperAdmin = session?.user?.role === 'ADMIN' || session?.user?.role === 'SUPERADMIN'

//   const menuItems: MenuItem[] = [
//     { text: 'Dashboard', icon: <DashboardIcon /> },
//     { text: 'HR Mgmt', icon: <PeopleIcon /> },
//     {
//       text: 'Products',
//       icon: <ProductsIcon />,
//       subItems: [
//         { text: 'Payroll Mgmt', icon: <PayrollIcon /> },
//         { text: 'Leave Management', icon: <LeaveIcon /> },
//         { text: 'Claim Management', icon: <ClaimIcon /> },
//         { text: 'Employee Database', icon: <EmployeeIcon /> },
//         { text: 'Timesheet and Attendance', icon: <TimesheetIcon /> },
//         { text: 'Scheduling and Shifts', icon: <SchedulingIcon /> },
//         { text: 'Mobile and Tablet Apps', icon: <MobileIcon /> },
//         { text: 'Biometrics', icon: <BiometricsIcon /> },
//         { text: 'Performance Appraisals', icon: <PerformanceIcon /> },
//         { text: 'Applicant Tracking System', icon: <ApplicantIcon /> },
//         { text: 'LMS', icon: <LMSIcon /> },
//         { text: 'Reports and Analytics', icon: <ReportsIcon /> },
//       ]
//     },
//     ...(isAdminOrSuperAdmin ? [{ text: 'Settings', icon: <SettingsIcon /> }] : []),
//   ]


//   const drawer = (
//     <div>
//       <div className="p-4 flex justify-center">
//         <Image src="/nanosoft-logo.png" alt="Nanosoft" width={150} height={50} />
//       </div>
//       <List>
//         {menuItems.map((item) => (
//           <React.Fragment key={item.text}>
//             <ListItem
//               button
//               onClick={item.subItems ? handleProductsClick : () => handleMenuClick(item.text)}
//             >
//               <ListItemIcon>
//                 {item.icon}
//               </ListItemIcon>
//               <ListItemText primary={item.text} />
//               {item.subItems && (productsOpen ? <ExpandLess /> : <ExpandMore />)}
//             </ListItem>
//             {item.subItems && (
//               <Collapse in={productsOpen} timeout="auto" unmountOnExit>
//                 <List component="div" disablePadding>
//                   {item.subItems.map((subItem) => (
//                     <ListItem
//                       button
//                       key={subItem.text}
//                       sx={{ pl: 4 }}
//                       onClick={() => handleMenuClick(subItem.text)}
//                     >
//                       <ListItemIcon>
//                         {subItem.icon}
//                       </ListItemIcon>
//                       <ListItemText primary={subItem.text} />
//                     </ListItem>
//                   ))}
//                 </List>
//               </Collapse>
//             )}
//           </React.Fragment>
//         ))}
//       </List>
//     </div>
//   )

//   const renderContent = () => {
//     switch (selectedMenu) {
//       case 'Dashboard':
//         return <DashboardContent />
//       case 'HR Mgmt':
//         return <EmployeeListPage />
//       case 'Settings':
//         if (!isAdminOrSuperAdmin) {
//           return (
//             <Typography variant="h6" color="error">Access Denied: You do not have permission to view this page.</Typography>
//           )
//         }
//         return <Settings />
//       default:
//         return <Typography variant="h6">Select a menu item to view content.</Typography>
//     }
//   }

//   if (status === 'loading') {
//     return (
//       <Box className="flex items-center justify-center h-screen">
//         <CircularProgress />
//       </Box>
//     )
//   }

//   if (status === 'unauthenticated') {
//     return null
//   }

//   return (
//     <Box className="flex h-screen">
//       <CssBaseline />
//       <AppBar
//         position="fixed"
//         className={`z-[1201] transition-all duration-300 ease-in-out ${sidebarOpen ? `w-[calc(100%-${drawerWidth}px)]` : 'w-full'
//           } ml-auto`}
//       >
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="toggle drawer"
//             edge="start"
//             onClick={toggleSidebar}
//             className="mr-2"
//           >
//             {sidebarOpen ? <ChevronLeftIcon /> : <MenuIcon />}
//           </IconButton>
//           <Typography variant="h6" noWrap component="div" className="flex-grow">
//             Dashboard
//           </Typography>
//           <Typography variant="body1" className="mr-2">
//             {session?.user?.name} ({session?.user?.role})
//           </Typography>
//           <Button color="inherit" onClick={handleSignOut}>
//             Sign Out
//           </Button>
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         variant="permanent"
//         open={sidebarOpen}
//         className={`transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-[240px]' : 'w-[64px]'
//           }`}
//         classes={{
//           paper: `transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-[240px]' : 'w-[64px]'
//             }`,
//         }}
//       >
//         <Toolbar />
//         {sidebarOpen ? drawer : (
//           <Box className="flex flex-col items-center py-4">
//             {menuItems.map((item) => (
//               <IconButton
//                 key={item.text}
//                 onClick={() => handleMenuClick(item.text)}
//                 className="my-2"
//               >
//                 {item.icon}
//               </IconButton>
//             ))}
//           </Box>
//         )}
//       </Drawer>
//       <Box
//         component="main"
//         className={`flex-grow p-3 transition-all duration-300 ease-in-out ${sidebarOpen ? `ml-[${drawerWidth}px]` : 'ml-[64px]'
//           }`}
//       >
//         <Toolbar />
//         <Typography variant="h4" gutterBottom>
//           {selectedMenu}
//         </Typography>
//         {renderContent()}
//       </Box>
//       {isSigningOut && (
//         <Box className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <Box className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
//             <CircularProgress size={60} />
//             <Typography variant="h6" className="mt-2">
//               Signing out...
//             </Typography>
//           </Box>
//         </Box>
//       )}
//       <footer className={`bg-gray-200 p-4 text-center transition-all duration-300 ease-in-out ${sidebarOpen ? `ml-[${drawerWidth}px]` : 'ml-[64px]'
//         }`}>
//         <Typography variant="body2">
//           © 2024 Your Company Name. All rights reserved.
//         </Typography>
//       </footer>
//     </Box>
//   )
// }