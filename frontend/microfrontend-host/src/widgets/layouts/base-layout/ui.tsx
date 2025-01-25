import { Sidebar } from "@/features/sidebar/ui/Sidebar";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";

import React, { ReactNode } from "react";

type BaseLayoutProps = {
  children: ReactNode;
};

export const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex flex-col flex-grow'>
        <Header />
        <main className='main h-full'>{children}</main>
        <Footer />
      </div>
    </div>
  );
};
