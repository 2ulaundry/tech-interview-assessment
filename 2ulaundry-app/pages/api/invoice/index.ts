import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { getSession } from 'next-auth/react'
import { getUser } from '../../../utils/getUser';


// POST /api/invoice
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  let {
    invoiceNumber,
    invoice_number,
    total,
    currency,
    invoiceDate,
    invoice_date,
    dueDate,
    due_date,
    vendorName,
    vendor_name,
    remittanceAddress,
    remittance_address
  } = req.body;

  invoiceNumber = invoice_number || invoiceNumber;
  invoiceDate = new Date(invoice_date) || invoiceDate;
  dueDate = new Date(due_date) || dueDate;
  vendorName = vendor_name || vendorName;
  remittanceAddress = remittance_address || remittanceAddress;

  const session = await getSession({ req });
  if (session) {
    const result = await prisma.invoice.create({
      data: {
        invoiceNumber,
        total,
        currency,
        invoiceDate,
        dueDate,
        vendorName,
        remittanceAddress,
        user: { connect: { email: session?.user?.email } },
      },
    });
    res.json({
      message: 'invoice submitted successfully',
    });
  } else {

    // for testing purposes
    const user = await getUser();
    const result = await prisma.invoice.create({
      data: {
        invoiceNumber,
        total,
        currency,
        invoiceDate,
        dueDate,
        vendorName,
        remittanceAddress,
        user: { connect: { email: user?.email } },
      },
    });
    res.json({
      message: 'invoice submitted successfully',
    });

    // res.status(401).send({ message: 'Unauthorized' })
  }
}
