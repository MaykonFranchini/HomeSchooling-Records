import { prisma } from '../../../services/prisma';
import type { NextApiRequest, NextApiResponse } from 'next'
import { send } from 'process';


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query

  if(!userId) {
    return res.status(404).json({ message: 'User not found'})
  }

  const students = await prisma.student.findMany({
    where: {
      userId: Number(userId)
    }
  })

  const ids = students.map(student => student.id)

  const recentActivities = await prisma.lesson.findMany({
    where: {
      studentId: {in: ids }
    },
    include: {
      student: true
    },
    take: 3
  })

  res.json({ students, recentActivities})

}
