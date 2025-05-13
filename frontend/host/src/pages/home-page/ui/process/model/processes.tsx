import React from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { motion } from "framer-motion";

import ProcessFirstElem from "@/shared/assets/images/main-page/process/first-elem.png";
import ProcessSecondElem from "@/shared/assets/images/main-page/process/second-elem.png";
import ProcessThirdElem from "@/shared/assets/images/main-page/process/third-elem.png";
import ProcessFourthElem from "@/shared/assets/images/main-page/process/fourth-elem.png";

interface ProcessItem {
  id: number;
  bgColor: string;
  text: string;
  img: string;
  alt: string;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const ProcessCard = ({ process }: { process: ProcessItem }) => {
  const isRight = process.id % 2 !== 0;

  return (
    <motion.div
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
      className={clsx(
        "relative mb-16 w-full md:w-1/2 px-4",
        isRight ? "md:self-end" : "md:self-start"
      )}>
      <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10'>
        <div className='w-10 h-10 rounded-full bg-white border-4 border-gray-300 flex items-center justify-center font-semibold text-gray-800'>
          {process.id + 1}
        </div>
      </div>

      <div
        className='bg-white p-6 rounded-3xl shadow-xl flex items-center gap-4'
        style={{ backgroundColor: process.bgColor }}>
        <img src={process.img} alt={process.alt} className='w-14 h-14 object-contain' />
        <p className='typography__text'>{process.text}</p>
      </div>
    </motion.div>
  );
};

export const ProcessesList = () => {
  const { t } = useTranslation("library");

  const processes: ProcessItem[] = [
    {
      id: 0,
      bgColor: "#E7F0F4",
      text: t("home_page.process.process_1"),
      img: ProcessFirstElem,
      alt: t("home_page.process.process_1"),
    },
    {
      id: 1,
      bgColor: "#E1F0F5",
      text: t("home_page.process.process_2"),
      img: ProcessSecondElem,
      alt: t("home_page.process.process_2"),
    },
    {
      id: 2,
      bgColor: "#C1D2F9",
      text: t("home_page.process.process_3"),
      img: ProcessThirdElem,
      alt: t("home_page.process.process_3"),
    },
    {
      id: 3,
      bgColor: "#86BFD9",
      text: t("home_page.process.process_4"),
      img: ProcessFourthElem,
      alt: t("home_page.process.process_4"),
    },
  ];

  return (
    <>
      {processes.map((process) => (
        <ProcessCard key={process.id} process={process} />
      ))}
    </>
  );
};
