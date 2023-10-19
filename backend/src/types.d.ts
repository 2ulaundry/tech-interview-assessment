export type Currency = 'USD' | 'EUR' | 'BRL' | 'CNY';
export type Status = 'Pending' | 'Processed' | 'Declined';

export interface InvoiceI {
  invoice_number: string;
  total: string;
  currency: Currency;
  invoice_date: string;
  due_date: string;
  vendor_name: string;
  remittance_address: string;
  status?: Status;
}
