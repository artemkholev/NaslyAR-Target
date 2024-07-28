import Link from 'next/link';

export const Connection = () => {
  return (
    <article id='connection' className='w-full flex justify-center mb-10'>
      <div className='w-[1200px] max-2xl:w-[1000px] max-lg:w-[90%] flex flex-col'>
        <h1 className='font-bold text-4xl p-8 text-center'>Связаться с нами очень просто!</h1>
        <div className='w-full flex bg-[#232424] rounded-[30px] p-14 gap-20 max-lg:flex-col'>
          <div className='flex flex-col bg-gradient-to-b from-[#4D4D4D] to-[#797979] p-10 rounded-[30px]'>
            <h2 className='text-white text-5xl max-md:text-3xl font-bold leading-normal'>
              Ну что, готов запустить <span className='line-through'>ракету</span> объявленияв
              космос
            </h2>
            <span className='text-white text-4xl max-md:text-2xl leading-normal'>
              Тогда погнали!
            </span>
          </div>
          <div className='h-full flex flex-col gap-5'>
            <input className='h-[60px] rounded-[30px] p-6' placeholder='Ваше имя' type='text' />
            <input className='h-[60px] rounded-[30px] p-6' placeholder='e-mail' type='text' />
            <input
              className='h-[60px] rounded-[30px] p-6'
              placeholder='Номер телефона'
              type='text'
            />
            <button className='mx-auto bg-gradient-bg bg-[length:300%_300%] animate-bg-gradient w-[160px] h-[55px] p-4 rounded-full text-white shadow-lg hover:shadow-[#787FF6]/50'>
              Старт
            </button>
            <p className='text-white text-xs'>
              Нажимая на кнопку, вы даете согласие на обработку персональных данных и соглашаетесь c{' '}
              <Link href='/privacy-policy'>
                <span className='text-[#FF8562]'>политикой конфиденциальности</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};
