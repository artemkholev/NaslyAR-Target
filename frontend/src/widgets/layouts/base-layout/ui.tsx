import type { PropsWithChildren } from "react";
import { Sidebar } from "@/features/sidebar/ui/Sidebar";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { useGate } from "effector-react";
import { useRouter } from "next/router";
import { navigationModel } from "@/shared/navigation";
import { Seo } from "./seo";

// run process logic for all base layout pages
// import "processes/root";

export const BaseLayout = ({ children }: PropsWithChildren) => {
  const router = useRouter();

  useGate(navigationModel.RouterGate, { router });

  return (
    <>
      <Seo />
      <div className='flex'>
        <Sidebar />
        <div className='flex flex-col flex-grow'>
          <Header />
          <main className='main h-full'>{children}</main>
          <Footer />
        </div>
      </div>
    </>
  );
};
