"use client";

import { Suspense, type ReactNode } from "react";
import Nav from "@components/nav";
import FooterApp from "@components/footerApp";
import Loading from "@components/loading";

type PageShellProps = {
  children: ReactNode;
  showContactInFooter?: boolean;
};

const PageShell = ({ children, showContactInFooter = true }: PageShellProps) => {
  return (
    <Suspense fallback={<Loading />}>
      <Nav />
      <main className="flex flex-1 flex-col bg-sanctuaryLinen">{children}</main>
      <FooterApp showContact={showContactInFooter} />
    </Suspense>
  );
};

export default PageShell;
