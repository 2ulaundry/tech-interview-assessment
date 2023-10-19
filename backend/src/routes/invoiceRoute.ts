import express from "express";

const router = express.Router();

router.get('/', (_req, res) => {
  res.send('Fetching invoices');
});

router.post('/', (_req, res) => {
  res.send('Saving invoice');
});

export default router;
