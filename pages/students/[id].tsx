import { format } from "date-fns";
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react";
import { StudentProps } from "./index"
import { prisma } from '../../services/prisma';


export default function Student(student: StudentProps) {
  return (
    <div>
      <ul>
        <li>{student.fullName}</li>
        <li>{student.schoolYear}</li>
        <li>{student.dateOfBirth}</li>
        <li>{student.userId}</li>

      </ul>
    </div>
  )
}


export const  getServerSideProps :GetServerSideProps = async ({req, params}) => {
  const session = await getSession({req})
  const { id } = params

    const student = await prisma.student.findUnique({
      where: {
        id: Number(id)
      }
    })
    
    if(session?.userId !== student?.userId) {
      return {
        notFound: true
      }
    }
    const formatedDOB = format(new Date(student!.dateOfBirth), 'dd/MM/yyyy')
  
  // Pass data to the page via props
  return { props: {
    fullName: student!.fullName,
    schoolYear: student!.schoolYear,
    avatarUrl: student!.avatarUrl,
    dateOfBirth: formatedDOB,
  } }
}