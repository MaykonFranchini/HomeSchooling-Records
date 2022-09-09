import { prisma } from '../../../services/prisma';
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'POST') {
      const {fullName, dateOfBirth, schoolYear, parentId} = req.body;
    const childAlreadyExist = await prisma.child.findFirst({
        where: {
          fullName,
          userId: parentId
        }
    })

    if(childAlreadyExist) {
      res.status(400).json({message: 'Child already exist'}) 
    } else {
      try {
        const child = await prisma.child.create({
          data: {
            fullName,
            schoolYear,
            userId: parentId,
            dateOfBirth: new Date(dateOfBirth)
          }
      })
      res.status(201).json(child);
      } catch (err: any) {
        res.status(500).send('error')
      }
    }
    }
    if(req.method === 'GET') {
      const { parentId } = req.query
      const convertedParentID =Number(parentId)
      const children = await prisma.child.findMany({
        where: {
          userId: convertedParentID
        }
      })
      res.status(200).json(children);
    }
}