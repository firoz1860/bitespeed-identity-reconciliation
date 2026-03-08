import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const identifyContact = async (req: Request, res: Response) => {
 try {

  const { email, phoneNumber } = req.body

  const existingContacts = await prisma.contact.findMany({
   where: {
    OR: [
     { email: email },
     { phoneNumber: phoneNumber }
    ]
   },
   orderBy:{
    createdAt:"asc"
   }
  })

  if(existingContacts.length === 0){

   const newContact = await prisma.contact.create({
    data:{
     email,
     phoneNumber,
     linkPrecedence:"primary"
    }
   })

   return res.json({
    contact:{
     primaryContactId:newContact.id,
     emails:[email],
     phoneNumbers:[phoneNumber],
     secondaryContactIds:[]
    }
   })
  }

  const primaryContact = existingContacts.find(
   c => c.linkPrecedence === "primary"
  ) || existingContacts[0]

  const allLinkedContacts = await prisma.contact.findMany({
   where:{
    OR:[
     { id: primaryContact.id },
     { linkedId: primaryContact.id }
    ]
   }
  })

  const emails = new Set<string>()
  const phones = new Set<string>()
  const secondaryIds:number[] = []

  allLinkedContacts.forEach(c=>{
   if(c.email) emails.add(c.email)
   if(c.phoneNumber) phones.add(c.phoneNumber)
   if(c.linkPrecedence === "secondary") secondaryIds.push(c.id)
  })

  if(email && !emails.has(email) || phoneNumber && !phones.has(phoneNumber)){
   const newSecondary = await prisma.contact.create({
    data:{
     email,
     phoneNumber,
     linkedId: primaryContact.id,
     linkPrecedence:"secondary"
    }
   })

   secondaryIds.push(newSecondary.id)

   if(email) emails.add(email)
   if(phoneNumber) phones.add(phoneNumber)
  }

  return res.json({
   contact:{
    primaryContactId: primaryContact.id,
    emails: Array.from(emails),
    phoneNumbers: Array.from(phones),
    secondaryContactIds: secondaryIds
   }
  })

 } catch(error){
  console.error(error)
  res.status(500).json({error:"Server Error"})
 }
}