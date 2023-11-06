import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import prisma from '../../../../lib/prisma'
import { InvoiceStatus } from '@prisma/client';

// PUT /api/approve/:id
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const postId = req.query.id;
  const session = await getSession({ req })

  if (session) {
    const post = await prisma.invoice.update({
      where: { id: Number(postId) },
      data: { status: InvoiceStatus.approved },
    });
    res.json(post);
  } else {
    const post = await prisma.invoice.update({
      where: { id: Number(postId) },
      data: { status: InvoiceStatus.approved },
    });
    res.json(post);
  }
}