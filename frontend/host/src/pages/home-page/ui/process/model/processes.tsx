import React from "react";
import { useTranslation } from "react-i18next";
import { motion, Variants } from "framer-motion";
import clsx from "clsx";
import { SearchCheck, Settings, BarChart4, Handshake } from "lucide-react";

interface ProcessItem {
  id: number;
  bgColor: string;
  text: string;
  Icon: React.FC<{ size?: number; className?: string }>;
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const ProcessCard = ({ process }: { process: ProcessItem }) => {
  const isLeft = process.id % 2 === 0;

  return (
    <motion.div
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.4 }}
      variants={fadeInUp}
      whileHover={{ scale: 1.03, y: -5 }}
      className='relative mb-20'>
      {/* Точка и линия */}
      <div className='absolute top-6 md:top-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center max-lg:hidden'>
        <div
          className='typography__title w-12 h-12 rounded-full flex items-center justify-center font-bold !text-white shadow-lg'
          style={{ backgroundColor: "#639149" }}>
          {process.id + 1}
        </div>
        <div className='w-1 h-20 bg-[#7da662] mt-1 rounded' />
      </div>

      {/* Карточка */}
      <div
        className={clsx(
          "absolute md:static px-8 md:w-auto",
          isLeft ? "mr-[540px] max-lg:mr-[350px]" : "ml-[540px] max-lg:ml-[350px]"
        )}>
        <div
          className='p-8 rounded-3xl shadow-md flex items-center gap-4'
          style={{
            backgroundColor: "#f0f0e4",
            color: "#2a2a2a",
            minHeight: "160px",
            flexDirection: isLeft ? "row" : "row-reverse",
          }}>
          <div className='p-4 rounded-full' style={{ backgroundColor: "#8aab55" }}>
            <process.Icon size={40} className='text-white' />
          </div>
          <p className='typography__text font-semibold max-w-xs leading-relaxed'>{process.text}</p>
        </div>
      </div>
    </motion.div>
  );
};

export const ProcessesList = () => {
  const { t } = useTranslation();

  const processes: ProcessItem[] = [
    {
      id: 0,
      bgColor: "#f0f0e4", // green.20
      text: t("home_page.process.process_1"),
      Icon: SearchCheck,
    },
    {
      id: 1,
      bgColor: "#f0f0e4",
      text: t("home_page.process.process_2"),
      Icon: Settings,
    },
    {
      id: 2,
      bgColor: "#f0f0e4",
      text: t("home_page.process.process_3"),
      Icon: BarChart4,
    },
    {
      id: 3,
      bgColor: "#f0f0e4",
      text: t("home_page.process.process_4"),
      Icon: Handshake,
    },
  ];

  return (
    <section className='relative'>
      {/* Вертикальная линия посередине */}
      <div className='block absolute top-10 bottom-10 left-1/2 -translate-x-1/2 w-1 bg-[#7da662] rounded max-md:flex max-md:flex-col max-lg:hidden' />
      {processes.map((process) => (
        <ProcessCard key={process.id} process={process} />
      ))}
    </section>
  );
};
