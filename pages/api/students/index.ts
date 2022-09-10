import { prisma } from '../../../services/prisma';
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'POST') {
      const {fullName, dateOfBirth, schoolYear, parentId} = req.body;
    const childAlreadyExist = await prisma.student.findFirst({
        where: {
          fullName,
          userId: parentId
        }
    })

    if(childAlreadyExist) {
      res.status(400).json({message: 'Student already exist'}) 
    } else {
      try {
        const student = await prisma.student.create({
          data: {
            fullName,
            schoolYear,
            userId: parentId,
            dateOfBirth: new Date(dateOfBirth)
          }
      })
      res.status(201).json(student);
      } catch (err: any) {
        res.status(500).send('error')
      }
    }
    }
    if(req.method === 'GET') {
      const { parentId } = req.query
      const convertedParentID =Number(parentId)
      const students = await prisma.student.findMany({
        where: {
          userId: convertedParentID
        }
      })
      res.status(200).json(students);
    }
}