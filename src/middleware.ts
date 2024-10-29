import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { isWithinCBD } from './utils/geofence'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })

  // If the user is not logged in, allow the request to proceed
  if (!token) {
    return NextResponse.next()
  }

  // Check if the request is for the restriction page
  if (request.nextUrl.pathname === '/restricted') {
    return NextResponse.next()
  }

  // Get the user's location from the request headers
  const latitude = parseFloat(request.headers.get('x-vercel-ip-latitude') || '0')
  const longitude = parseFloat(request.headers.get('x-vercel-ip-longitude') || '0')

  console.log("Latitude:", latitude, "Longitude:", longitude);

  // If the user is not within the CBD, redirect to the restriction page
  if (!isWithinCBD(latitude, longitude)) {
    return NextResponse.redirect(new URL('/restricted', request.url))
  }

  // Allow the request to proceed
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}