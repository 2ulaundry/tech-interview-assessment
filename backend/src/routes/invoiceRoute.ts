import express from "express";
import { addInvoice, getAllInvoices, getInvoiceByNumber } from "../services/invoiceService";

const router = express.Router();

router.get('/:id', (req, res) => {
  const diary = getInvoiceByNumber(req.params.id);
  if (diary) {
    return res.status(200).send(diary);
  }
  return res.status(404).send({ error: "Couldn't find record" });
})

router.get('/', (_req, res) => {
  res.status(200).send(getAllInvoices());
});

router.post('/', (req, res) => {
  try {
    const {
      invoice_number,
      total,
      currency,
      invoice_date,
      due_date,
      vendor_name,
      remittance_address,
      status = 'Pending'
    } = req.body || {};
    const savedInvoice = addInvoice(
      invoice_number,
      total,
      currency,
      invoice_date,
      due_date,
      vendor_name,
      remittance_address,
      status 
    );
    if (savedInvoice) {
      return res.status(201).send(savedInvoice);
    }
  } catch (error: any) {
    return res.status(400).send({
      error: error?.message || 'Something went wrong.'
    });
  }
  return;
});

export default router;
