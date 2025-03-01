import React, { useState } from "react";
import { OpenCloseButton } from "@/shared/ui/open-close-button";
import { quations } from "../model";

interface Quations {
  id: number;
  open: boolean;
  title: string;
  discription: string;
}

export const Quations = () => {
  const [quationsArray, setQuationsArray] = useState<Quations[]>(quations);

  const toggleOpen = (item: Quations) => {
    setQuationsArray((prevState) =>
      prevState.map((itemArray) => {
        if (itemArray.title === item.title) {
          item.open = !item.open;
        }
        return itemArray;
      })
    );
  };

  const quationsContent = quationsArray.map((item) => (
    <li
      key={item.id}
      className={`${
        item.open ? "bg-[#DFE6EF]" : "bg-white"
      } rounded-[30px] py-4 max-md:h-auto px-8 w-full mb-1`}>
      <div
        className='w-full flex flex-row justify-between gap-5 items-center cursor-pointer'
        onClick={() => toggleOpen(item)}>
        <p className='font-bold text-xl flex-1 break-words text-left'>{item.title}</p>
        <OpenCloseButton isOpen={item.open} onToggle={() => {}} /> 
      </div>
      {item.open && <div className='mt-6 whitespace-pre-line'>{item.discription}</div>}
    </li>
  ));

  return (
    <article id='quations' className='page__box'>
      <h1 className='typography__title--large text-center'>Отвечаем на часто задаваемые вопросы</h1>
      <div>
        <ul className='flex flex-col items-center p-0'>{quationsContent}</ul>
      </div>
    </article>
  );
};
