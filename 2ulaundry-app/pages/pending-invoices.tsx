import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import Post, { InvoiceProps } from "../components/Invoice";
import { useSession, getSession } from "next-auth/react";
import prisma from '../lib/prisma'
import { InvoiceStatus } from '@prisma/client';
import Invoice from '../components/Invoice';
import { getUser } from '../utils/getUser';


export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  let email;
  if (!session) {
    // res.statusCode = 403;
    // return { props: { invoices: [] } };
    email = (await getUser()).email;
  } else {
    email = session.user.email;
  }

  const invoices = await prisma.invoice.findMany({
    where: {
      user: { email: email },
      status: InvoiceStatus.pending,
    },
    include: {
      user: {
        select: { name: true },
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

const Pending: React.FC<Props> = (props) => {
  const {data: session}= useSession();

  if (!session) {
    // return (
    //   <Layout>
    //     <h1>My Pending Invoice</h1>
    //     <div>You need to be authenticated to view this page.</div>
    //   </Layout>
    // );
  }
  return (
    <Layout>
      <div className="page">
      {/* statusInvoiceStatus: ssName="page"> */}
        <h1>My Pending</h1>
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

export default Pending;
