'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Typography, Container, Box } from '@mui/material'

export default function RestrictedPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (session?.user?.isWithinCBD) {
      router.push('/dashboard')
    }
  }, [session, status, router])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h4" gutterBottom>
          Access Restricted
        </Typography>
        <Typography variant="body1">
          We're sorry, but access to this website is currently restricted to users within Singapore's Central Business District (CBD).
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          If you believe you are seeing this message in error, please contact our support team.
        </Typography>
      </Box>
    </Container>
  )
}