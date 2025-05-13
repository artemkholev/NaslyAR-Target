import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cases } from "../model";

interface Case {
  id: number;
  titleButton: string;
  img: any;
  alt: string;
  isActive: boolean;
}

const fadeVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -30, transition: { duration: 0.3 } },
};

export const Cases = () => {
  const [casesArray, setCasesArray] = useState<Case[]>(cases);
  const [selectedCase, setSelectedCase] = useState<Case>(casesArray[0]);

  const handlerSelectCase = (selectedCaseShow: Case) => {
    const updatedCases = casesArray.map((item) => ({
      ...item,
      isActive: item.id === selectedCaseShow.id,
    }));
    setCasesArray(updatedCases);
    setSelectedCase(selectedCaseShow);
  };

  return (
    <article id='cases' className='flex justify-center max-lg:flex-col gap-5'>
      <div className='w-1/2 max-lg:w-full'>
        <h1 className='typography__title font-bold mb-2'>А вот и наши кейсы</h1>
        <p className='typography__text mb-5'>
          Смотрите, что мы уже успели сделать и присоединяйтесь
        </p>

        <div className='flex flex-wrap gap-4'>
          {casesArray.map((caseButton) => (
            <button
              key={caseButton.id}
              onClick={() => handlerSelectCase(caseButton)}
              className={`text-nowrap px-4 py-2 rounded-full transition-all duration-300 shadow-md text-white text-sm font-medium 
                ${
                  caseButton.isActive
                    ? "bg-gradient-to-r from-[#639149] via-[#7da662] to-[#8aab55]"
                    : "bg-gradient-bg bg-[length:300%_300%] animate-bg-gradient hover:shadow-[#639149]/50"
                }`}>
              {caseButton.titleButton}
            </button>
          ))}
        </div>
      </div>

      <div className='w-1/2 max-lg:w-full h-full relative bg-gradient-to-br from-[#639149] to-[#639149]/40 rounded-3xl p-10'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={selectedCase.id}
            initial='hidden'
            animate='visible'
            exit='exit'
            variants={fadeVariant}
            className='p-5 bg-white/80 backdrop-blur-sm flex flex-col gap-5 rounded-3xl shadow-lg'>
            <h2 className='text-lg font-semibold'>
              <span className='text-[#639149]'>Кейс в нише: </span>
              {selectedCase.titleButton}
            </h2>
            <img
              src={selectedCase.img}
              alt={selectedCase.alt}
              className='rounded-xl max-h-[300px] object-cover'
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </article>
  );
};
