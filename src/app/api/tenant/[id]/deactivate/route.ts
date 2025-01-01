import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id)

  try {
    await prisma.tenant.update({
      where: { id },
      data: { active: false },
    })

    return NextResponse.json({ message: 'Tenant deactivated successfully' })
  } catch (error) {
    console.error('Error deactivating tenant:', error)
    return NextResponse.json({ error: 'Failed to deactivate tenant' }, { status: 500 })
  }
}

