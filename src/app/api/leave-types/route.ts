import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const leaveTypes = await prisma.leave_Type.findMany()
      res.status(200).json(leaveTypes)
    } catch (error) {
      res.status(500).json({ message: 'Error fetching leave types', error })
    }
  } else if (req.method === 'POST') {
    try {
      const { name, description, default_days } = req.body
      const newLeaveType = await prisma.leave_Type.create({
        data: {
          name,
          description,
          default_days: parseInt(default_days)
        }
      })
      res.status(201).json(newLeaveType)
    } catch (error) {
      res.status(500).json({ message: 'Error creating leave type', error })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}