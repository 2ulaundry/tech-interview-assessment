import React from "react";
import type { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import Invoice, { InvoiceProps } from "../components/Invoice";
import prisma from '../lib/prisma'
import { InvoiceStatus } from '@prisma/client';

export const getServerSideProps: GetServerSideProps = async () => {
  const invoices = await prisma.invoice.findMany({
    where: {
      // I want to get all invoices 
      // status: InvoiceStatus.pending,
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });
  return {
    props: { invoices: JSON.parse(JSON.stringify(invoices)) },
  };
};

type Props = {
  invoices: InvoiceProps[];
};

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          {props.invoices.map((invoice) => (
            <div key={invoice.id} className="invoice">
              <Invoice invoice={invoice} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .invoice {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .invoice:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .invoice + .invoice {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Blog;
