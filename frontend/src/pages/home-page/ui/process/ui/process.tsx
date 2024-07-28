import Image, { StaticImageData } from 'next/image';

import { processes } from '../model';
import { useState } from 'react';

interface Processes {
  id: number;
  bgColor: string;
  text: string;
  img: StaticImageData;
  alt: string;
}

export const Process = () => {
  const [processesArray] = useState<Processes[]>(processes);

  const processesContent = processesArray.map((process: Processes) => (
    <div
      key={process.id}
      className='w-full flex max-md:mb-1'
      style={{
        justifyContent: process.id % 2 ? 'end' : 'start',
      }}>
      <div
        className='h-[320px] lg:w-full max-md:h-auto flex flex-col gap-5 rounded-[60px] p-10 max-lg:w-[500px] max-md:w-[420px] md:max-lg:relative md:max-lg:-mt-[80px]'
        style={{
          backgroundColor: process.bgColor,
        }}>
        <div className='flex justify-between'>
          <span className='w-20 h-12 bg-white rounded-full text-4xl p-1 flex justify-center items-center'>
            {process.id + 1}
          </span>
          <Image src={process.img} alt={process.alt} />
        </div>
        <span className='text-2xl'>{process.text}</span>
      </div>
    </div>
  ));

  return (
    <article id='process' className='w-full flex justify-center mb-10'>
      <div className='w-[1200px] max-2xl:w-[1000px] max-lg:w-[90%] flex flex-col justify-center'>
        <h1 className='font-bold text-4xl p-8 text-center md:max-lg:mb-[80px]'>
          Смотрите, как строится наша работа:
        </h1>

        <div className='relative h-auto w-full grid grid-cols-2 max-lg:grid-cols-1'>
          {processesContent}
        </div>
      </div>
    </article>
  );
};
