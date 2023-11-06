import React from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/Layout";
import Router from "next/router";
import { InvoiceProps } from "../../components/Invoice";
import prisma from '../../lib/prisma'
import { useSession } from "next-auth/react";


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const invoice = await prisma.invoice.findUnique({
    where: {
      id: Number(params?.id) || -1,
    },
    include: {
      user: {
        select: { name: true, email: true },
      },
    },
  });
  return {
    props: JSON.parse(JSON.stringify(invoice)),
  };
};

async function publishPost(id: number): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: "PUT",
  });
  await Router.push("/")
}

async function deletePost(id: number): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: "DELETE",
  });
  await Router.push("/")
}

const Post: React.FC<InvoiceProps> = (props) => {
  const { data: session, status } = useSession();
  if (status === 'loading') {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === props.user?.email;
  // let title = props.title;
  // if (!props.published) {
  //   title = `${title} (Pending Invoices)`;
  // }

  const approveButton = async () => {
    await fetch(`/api/invoice/approve/${props.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });
    await Router.push("/");

  }

  return (
    <Layout>
      <div>
        <h2>Invoice number: {props.invoiceNumber}</h2>
        <p>By {props?.user?.name || "Unknown author"}</p>
        <button type="button" onClick={approveButton}>Approve invoice</button>
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Post;
