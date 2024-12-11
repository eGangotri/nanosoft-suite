'use client'

import React, { useState, useEffect } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import { Box, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import AppHeader from './app-header'
import Sidebar from './sidebar'
import MainContent from './main-content'
import SignOutOverlay from './sign-out-overlay'
import Footer from './footer'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleSignOut = async () => {
    setIsSigningOut(true)
    await signOut({ callbackUrl: '/login' })
  }

  if (status === 'loading') {
    return <Box className="flex items-center justify-center h-screen">Loading...</Box>
  }

  if (status === 'unauthenticated') {
    return null
  }

  return (
    <Box className="flex flex-col h-screen" role="banner">
      <AppHeader
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        session={session}
        onSignOut={handleSignOut}
      />
      <Box className="flex-grow overflow-scroll">
        <Sidebar
          sidebarOpen={sidebarOpen}
          isMobile={isMobile}
          session={session}
          pathname={pathname}
        />
        <MainContent sidebarOpen={sidebarOpen}>
          {children}
        </MainContent>
      </Box>
      {isSigningOut && <SignOutOverlay />}
      <Footer sidebarOpen={sidebarOpen} />
    </Box>
  )
}