import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  const stream = new ReadableStream({
    async start(controller) {
      const sendTenant = (tenant: any) => {
        controller.enqueue(`data: ${JSON.stringify(tenant)}\n\n`)
      }

      let lastCheckedId = 0

      const intervalId = setInterval(async () => {
        const latestTenants = await prisma.tenant.findMany({
          where: {
            id: {
              gt: lastCheckedId
            }
          },
          orderBy: {
            id: 'asc',
          },
          select: {
            id: true,
            name: true,
            email: true,
            companyName: true,
            uenNo: true,
            entityType: true,
            industry: true,
            contactNo: true,
            domain: true,
            createdAt: true,
            updatedAt: true,
          },
        })

        for (const tenant of latestTenants) {
          sendTenant(tenant)
          lastCheckedId = tenant.id
        }
      }, 5000) // Check for new or updated tenants every 5 seconds

      // Clean up the interval when the client disconnects
      return () => clearInterval(intervalId)
    },
  })

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
}

