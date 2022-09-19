import { prisma } from '../../../services/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'POST') {
    console.log(req.body);
    
    const {subject, content, studentId} = req.body;

    try {
      const lesson = await prisma.lesson.create({
        data: {
          subject,
          content,
          studentId
        }
      });
      res.status(201).json(lesson);
    } catch (err: any) {
      res.status(500).send('error')
    }
  }

}