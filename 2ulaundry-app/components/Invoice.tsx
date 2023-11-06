import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type InvoiceProps = {
  id: number;
  invoiceNumber: string;
  total: number;
  currency: string;
  user: {
    name: string;
    email: string;
  } | null;
  vendorName: string;
  status: string
};

const Invoice: React.FC<{ invoice: InvoiceProps }> = ({ invoice }) => {
  const userName = invoice.user ? invoice.user.name : "Unknown user";
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${invoice.id}`)}>
      <h2>Invoice number: {invoice.invoiceNumber}</h2>
      <p>Total: {invoice.total} {invoice.currency}</p>
      <p>Status: {invoice.status}</p>
      <p>Total: {invoice.total}</p>
      <p>Vendor name: {invoice.vendorName || 'Unknown name'}</p>
      <small>By {userName}</small>
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Invoice;
