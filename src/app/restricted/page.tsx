'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Typography, Container, Box } from '@mui/material'
import { CHOSEN_BOUNDS, getChosenGeoFence, isWithinBounds } from '@/utils/geofence'

export default function RestrictedPage() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [locationStatus, setLocationStatus] = useState("Checking location...");

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const isInside = isWithinBounds(latitude, longitude, CHOSEN_BOUNDS);

                    setLocationStatus(isInside ? "Inside geofence" : "Outside geofence");
                    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
                },
                (error) => {
                    console.error("Geolocation error: ", error);
                    setLocationStatus(`Unable to retrieve location, ${error.message}`);
                }
            );
        } else {
            setLocationStatus("Geolocation is not supported by this browser.");
        }
        if (status === 'unauthenticated') {
            router.push('/login')
        } else if (session?.user?.isWithinGeoFence) {
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
                <Box>
                    <Typography variant="body1">
                        We're sorry, but access to this website is currently restricted to users within <span className="font-bold">{getChosenGeoFence()}</span>.
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 2 }}>
                        If you believe you are seeing this message in error, please contact our support team.
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 2 }}>
                        GeoFence Status Message: <span className="font-bold">{locationStatus}</span>
                        <div><a href="/">Try Again</a></div>
                    </Typography>
                </Box>
            </Box>
        </Container>
    )
}