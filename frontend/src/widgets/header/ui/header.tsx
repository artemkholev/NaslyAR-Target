import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { CONTENT_NAVIGATION_MENU } from '@/shared/const';

import PhoneImg from '@/shared/assets/images/header/whatsApp.png';
import Menu from '@/shared/assets/icons/header/menu.svg';

export const Header = () => {
  //   //   const navigate = useNavigate();
  // const [isViewNavigationMenu, setIsViewNavigationMenu] = useState(false);

  const onToggleHideNavigationMenu = (): void => {
    // setIsViewNavigationMenu((prevState) => !prevState);
  };

  const navigationContent = CONTENT_NAVIGATION_MENU.map((item) => (
    <li key={item.title}>
      <Link href={item.link}>{item.title}</Link>
    </li>
  ));

  return (
    <header className='w-full flex justify-center mt-[25px] mb-[40px] max-lg:'>
      <div className='w-[1200px] max-2xl:w-[1000px] max-lg:w-[90%] h-[60px] flex items-center justify-between bg-white rounded-[30px] p-[25px]'>
        <div className='flex gap-10'>
          <Link href='/'>
            <h2 className='font-bold whitespace-nowrap'>NuslyAr | Target</h2>
          </Link>
          <nav className='flex items-center max-md:hidden'>
            <ul className='flex items-center p-0 gap-5'>{navigationContent}</ul>
          </nav>
        </div>

        <div>
          <div className='flex flex-row items-center gap-3'>
            <span className='font-bold text-base max-lg:hidden'>8_xxx_xxx_xx_xx</span>
            <a href='tel:+78005555505'>
              <Image src={PhoneImg} alt='Контакты whatsApp' />
            </a>
          </div>

          <button
            type='button'
            onClick={onToggleHideNavigationMenu}
            aria-label='toggle view menu'
            className='hidden'>
            <Image src={Menu} className='w-[30px] h-[30px]' alt='' />
          </button>
        </div>
      </div>
    </header>
  );
};
