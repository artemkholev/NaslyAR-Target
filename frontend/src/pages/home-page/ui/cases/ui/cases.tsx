import Image, { StaticImageData } from 'next/image';
import { cases } from '../model';
import { useState } from 'react';

interface Case {
  id: number;
  titleButton: string;
  img: StaticImageData;
  alt: string;
  isActive: boolean;
}

export const Cases = () => {
  const [casesArray] = useState<Case[]>(cases);
  const [selectedCase, setSelectedCase] = useState<Case>(casesArray[0]);

  const casesButtonsContent = casesArray.map((caseButton: Case) => (
    <button
      key={caseButton.id}
      onClick={() => handlerSelectCase(caseButton)}
      className={`text-nowrap bg-gradient-bg bg-[length:300%_300%] animate-bg-gradient h-[55px] p-4 rounded-full text-white shadow-lg hover:shadow-[#787FF6]/50 focus:border-none focus:shadow-none ${caseButton.isActive ? 'bg-gradient-to-r from-[#1CA7EC] via-[#1D6AC1] to-[#1E2F97]' : ''}`}>
      {caseButton.titleButton}
    </button>
  ));

  const handlerSelectCase = (selectedCaseShow: Case) => {
    setSelectedCase(selectedCaseShow);
  };

  return (
    <article id='cases' className='w-full flex justify-center mb-10'>
      <div className='w-[1200px] max-2xl:w-[1000px] max-lg:w-[90%] flex max-lg:flex-col gap-5 items-center'>
        <div className='w-1/2 max-lg:w-full'>
          <h1 className='font-bold text-4xl mr-20 leading-relaxed'>
            А вот и наши <span className='bg-[#7BD5F5] rounded-3xl px-2'>кейсы</span>
          </h1>
          <p className='text-2xl mb-5'>Смотрите, что мы уже успели сделать и присоединяйтесь</p>

          <div className='flex flex-wrap gap-5'>{casesButtonsContent}</div>
        </div>
        <div className='w-1/2 max-lg:w-[90%] h-full relative bg-gradient-to-br from-[#7BD5F5] to-[#787FF6]/50 rounded-3xl p-16 max-2xl:p-10'>
          <div className='p-5 bg-white/80 flex flex-col gap-5 rounded-3xl -ml-[25%] -mb-[10%] max-2xl:-ml-[15%]'>
            <h2 className='text-lg'>
              <span className='text-[#797EF6]'>Кейс в нише: </span>
              {selectedCase.titleButton}
            </h2>
            <Image src={selectedCase.img} priority alt={selectedCase.alt} />
          </div>
        </div>
      </div>
    </article>
  );
};
