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
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  ExpandLess,
  ExpandMore,
  Apps as ProductsIcon,
} from '@mui/icons-material'
import Image from 'next/image'

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
    {
      text: 'Products',
      icon: <ProductsIcon />,
      subItems: [
        { text: 'Product List', icon: <ProductsIcon />, route: '/products' },
        { text: 'Add Product', icon: <ProductsIcon />, route: '/products/add' },
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
        className={`z-[1201] transition-all duration-300 ease-in-out ${
          sidebarOpen ? `w-[calc(100%-${drawerWidth}px)]` : 'w-full'
        }`}
        sx={{ marginLeft: sidebarOpen ? `${drawerWidth}px` : 0 }}
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
      <Box className="flex flex-grow">
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
          {sidebarOpen ? drawer : (
            <Box className="flex flex-col items-center py-4">
              {menuItems.map((item) => (
                <IconButton
                  key={item.text}
                  component={Link}
                  href={item.route || '#'}
                  onClick={() => handleMenuClick(item.text)}
                  className="my-2"
                >
                  {item.icon}
                </IconButton>
              ))}
            </Box>
          )}
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
      <footer className="bg-gray-200 p-4 text-center mt-auto">
        <Typography variant="body2">
          © 2024 Your Company Name. All rights reserved.
        </Typography>
      </footer>
    </Box>
  )
}