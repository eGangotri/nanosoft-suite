import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  console.log('GET request received for employee:list')
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const searchTerm = searchParams.get('searchTerm') || ''
    const id = searchParams.get('id') || ''

    // Calculate offset
    const offset = (page - 1) * limit
    if (parseInt(id) > 0) {
      console.log('Fetching employee with ID:', id)
      // Fetch employees
      const employees = await prisma.employee.findMany({
        where: {
          OR: [
            { firstName: { contains: searchTerm, mode: 'insensitive' } },
            { lastName: { contains: searchTerm, mode: 'insensitive' } },
            { email: { contains: searchTerm, mode: 'insensitive' } },
          ],
        },
        skip: offset,
        take: limit,
        orderBy: { id: 'asc' },
      })


      // Get total count for pagination
      const totalCount = await prisma.employee.count({
        where: {
          OR: [
            { firstName: { contains: searchTerm, mode: 'insensitive' } },
            { lastName: { contains: searchTerm, mode: 'insensitive' } },
            { email: { contains: searchTerm, mode: 'insensitive' } },
          ],
        },
      })

      // Return the response
      return NextResponse.json({
        employees,
        totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit)
      })
    }
    else {
      const employeeId = parseInt(id)

      if (isNaN(employeeId)) {
        throw new Error('Invalid employee ID')
      }

      const employee = await prisma.employee.findUnique({
        where: {
          id: employeeId
        }
      })

      if (!employee) {
        // Handle case where no employee is found
        console.log('No employee found with ID:', employeeId)
        return null
      }

      return NextResponse.json({
        employee
      })
    }
  } catch (error) {
    console.error('Error fetching employees:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}