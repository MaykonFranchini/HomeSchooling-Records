import { prisma } from '../../../services/prisma';
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
   if(req.method === 'GET') {
    const { studentId } = req.query
    const id =Number(studentId)
    const child = await prisma.child.findFirst({
      where: {
        id
      }
    })
    res.status(200).json(child);
  }
}