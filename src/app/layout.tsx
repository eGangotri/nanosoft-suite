import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from '@/components/Providers'
import '@/styles/globals.css';
import { GLOBAL_CONSTS, NANOSOFT_ROLES } from '@/globalConstants';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: GLOBAL_CONSTS.title,
  description: GLOBAL_CONSTS.description,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </head>
      <body className={inter.className}>
          <Providers>{children}</Providers>
      </body>
    </html>
  )
}