import React, { useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";

const Pending: React.FC = () => {
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [total, setTotal] = useState(0);

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { invoiceNumber, total };
      await fetch(`/api/invoice`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/pending-invoices");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>New Invoice</h1>
          <input
            autoFocus
            onChange={(e) => setInvoiceNumber(e.target.value)}
            placeholder="Invoice"
            type="text"
            value={invoiceNumber}
          />
          <input
            onChange={(e) => setTotal(+e.target.value)}
            placeholder="Total"
            type="number"
            value={total}
          />
          <br />
          <input disabled={!total || !total} type="submit" value="Create" />
          <a className="back" href="#" onClick={() => Router.push("/")}>
            or Cancel
          </a>
        </form>
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type="text"],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type="submit"] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Pending;
