import express from "express";
import { addInvoice, getAllInvoices } from "../services/invoiceService";

const router = express.Router();

router.get('/', (_req, res) => {
  const data = getAllInvoices();
  console.log({ data });
  res.send('Fetching invoices');
});

router.post('/', (_req, res) => {
  const save = addInvoice();
  console.log({ save });
  res.send('Saving invoice');
});

export default router;
