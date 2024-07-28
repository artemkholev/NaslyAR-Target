import { goals } from '../model';

interface Goals {
  id: number;
  text: string;
  icon: string;
  amount: number;
}

export const Goals = () => {
  const goalsContent = goals.map((goal) => (
    <div key={goal.id} className='w-[280px] max-md:w-[260px] relative flex  max-lg:-left-[5%] max-md:mb-1'>
      <div
        className='w-full rounded-[42px] h-60 flex items-center justify-center p-4'
        style={{ backgroundColor: goal.id % 2 ? '#DFE6EF' : '#F3F3F3' }}>
        <div className='absolute left-[30%] text-2xl z-[13] flex flex-col gap-2'>
          <span>{goal.text}</span>
          <span className='w-14 bg-white rounded-full text-center text-lg'>
            {goal.icon}
            {goal.amount}
          </span>
        </div>
      </div>
      <div
        className='absolute right-[-25%] w-56 rounded-full h-60 flex items-center justify-center p-4 z-[11]'
        style={{ backgroundColor: goal.id % 2 ? '#DFE6EF' : '#F3F3F3' }}></div>
    </div>
  ));

  return (
    <article id='goals' className='w-full flex justify-center mb-10'>
      <div className='w-[1200px] max-2xl:w-[1000px] max-lg:w-[90%] flex flex-col justify-center'>
        <h1 className='font-bold text-4xl p-8 text-center'>Вам точно нужны мы, если</h1>
        <div className='flex items-center md:max-lg:grid md:max-lg:grid-cols-2 md:max-lg:place-items-center max-md:flex-col'>
          {goalsContent}
        </div>
      </div>
    </article>
  );
};
