import { Metadata } from "next";

import Navbar from "@/modules/layout/components/navbar";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
};

export default async function PageLayout(props: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {props.children}
    </>
  );
}
