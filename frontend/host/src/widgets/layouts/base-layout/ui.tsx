import React from "react";
import { Sidebar } from "@/features/sidebar/ui/Sidebar";
import { Outlet } from "react-router-dom";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";

export const BaseLayout: React.FC = () => {
  return (
    <div>
      {/* <Sidebar /> */}
      <div className='flex flex-col flex-grow'>
        <Header />
        <main className='main h-full'>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};
