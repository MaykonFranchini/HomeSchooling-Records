import { prisma } from '../../../services/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'POST') {

    const {subject, content, studentId, image_url} = req.body;

    try {
      const lesson = await prisma.lesson.create({
        data: {
          subject,
          content,
          studentId,
          file_url: image_url
        }
      });
      res.status(201).json(lesson);
    } catch (err: any) {
      res.status(500).send('error')
    }
  }

}
