import React from "react";
import { Sidebar } from "@/features/sidebar/ui/Sidebar";
import { Outlet } from "react-router-dom";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";

export const BaseLayout: React.FC = () => {
  return (
    <div className='h-full flex flex-col items-center'>
      {/* <Sidebar /> */}
      <Header />
      <main className='content'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
