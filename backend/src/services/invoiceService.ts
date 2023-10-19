import { Currency, InvoiceI, Status } from '../types';
import invoiceData from './invoiceData.json';

const data: InvoiceI[] = invoiceData as InvoiceI[];

export const getAllInvoices = (): Array<InvoiceI> => data;

export const getInvoiceByNumber = (number: string): InvoiceI | undefined => data.find((invoice) => invoice.invoice_number === number);

export const addInvoice = (
  invoice_number: string,
  total: string,
  currency: Currency,
  invoice_date: string,
  due_date: string,
  vendor_name: string,
  remittance_address: string,
  status: Status
): InvoiceI | null => {
  if (
    !invoice_number ||
    !total ||
    !invoice_date ||
    !due_date ||
    !vendor_name ||
    !remittance_address
  ) {
    throw new Error('There is missing invoice information in the request body.');
  }
  const newInvoice = {
    invoice_number,
    total,
    currency: currency || "USD",
    invoice_date,
    due_date,
    vendor_name,
    remittance_address,
    status: status || "Pending",
  }
  data.push(newInvoice);
  return newInvoice;
};
