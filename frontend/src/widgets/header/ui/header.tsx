import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import { useDispatch } from "react-redux";
import { toggleSidebar } from "@/features/sidebar";

import { CONTENT_NAVIGATION_MENU } from "@/shared/content";

import TgIcon from "@/shared/assets/icons/header/tg.svg";
import Menu from "@/shared/assets/icons/header/menu.svg";

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation("library");

  const navigationContent = CONTENT_NAVIGATION_MENU.map((item) => (
    <li key={item.title}>
      <Link href={item.link} className="typography__title--medium">{item.title}</Link>
    </li>
  ));

  return (
    <header className='header'>
      <div className='header__container'>
        <div className='flex items-center gap-10'>
          <Link href='/'>
            <h2 className='typography__title--medium font-bold'>{t("common.company_name")}</h2>
          </Link>
          <nav className='max-md:hidden'>
            <ul className='flex items-center p-0 gap-5'>{navigationContent}</ul>
          </nav>
        </div>

        <div>
          <a className='flex items-center gap-3 max-md:hidden' href='tel:+79302406554'>
            <span className='typography__title--medium'>{t("common.company_phone")}</span>

            <Image className='header__img' src={TgIcon} alt='phone' />
          </a>

          <button
            type='button'
            onClick={() => dispatch(toggleSidebar())}
            aria-label='toggle view menu'
            className='hidden max-md:block'>
            <Image className='header__img' src={Menu} alt='menu' />
          </button>
        </div>
      </div>
    </header>
  );
};
