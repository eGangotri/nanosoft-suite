import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (req.method === 'PUT') {
    try {
      const { name, description, default_days } = req.body
      const updatedLeaveType = await prisma.leave_Type.update({
        where: { id: Number(id) },
        data: {
          name,
          description,
          default_days: parseInt(default_days)
        }
      })
      res.status(200).json(updatedLeaveType)
    } catch (error) {
      res.status(500).json({ message: 'Error updating leave type', error })
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.leave_Type.delete({
        where: { id: Number(id) }
      })
      res.status(204).end()
    } catch (error) {
      res.status(500).json({ message: 'Error deleting leave type', error })
    }
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}