'use client'

import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { SessionProvider } from 'next-auth/react'
import nanosoftTheme from '@/styles/theme'  // You'll need to create this file
import { RecoilRoot } from 'recoil';
import { AuthStateManager } from '@/app/AuthStateManager'


export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RecoilRoot>
      <SessionProvider>
        <AuthStateManager />
        <ThemeProvider theme={nanosoftTheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </SessionProvider>
    </RecoilRoot>

  )
}