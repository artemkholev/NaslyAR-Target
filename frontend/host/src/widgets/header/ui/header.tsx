import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { toggleSidebar } from "@/features/sidebar";
import { useUser } from "@/entities/user";
import { CONTENT_NAVIGATION_MENU } from "@/shared/content";
import TgIcon from "@/shared/assets/icons/header/tg.svg";
import Menu from "@/shared/assets/icons/header/menu.svg";
import { useAuth } from "@/features/auth";
import { useToaster } from "@/shared/lib/toaster";
import { AppRoutes } from "@/app/router";

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { user, isAuthenticated } = useUser();
  const { logout } = useAuth();
  const location = useLocation(); // Получаем текущий путь
  const { showToast } = useToaster();

  const showNavigationContent = location.pathname === "/";
  const showNavigationButtonLogin =
    location.pathname === AppRoutes.AUTH_LOGIN || location.pathname === AppRoutes.AUTH_REGISTER;

  const navigationContent = showNavigationContent
    ? CONTENT_NAVIGATION_MENU.map((item) => (
        <li key={item.title}>
          <a href={item.link} className='typography__title--medium'>
            {item.title}
          </a>
        </li>
      ))
    : null;

  const handleLogout = async () => {
    try {
      const responce: string = await logout();
      showToast(responce, "success");
    } catch (error: any) {
      showToast(error, "error");
    }
  };

  return (
    <header className='header'>
      <div className='header__container'>
        <div className='flex items-center gap-10'>
          <a href='/'>
            <h2 className='typography__title--medium font-bold'>{t("common.company_name")}</h2>
          </a>
          {/* Отображаем навигацию только если showNavigationContent === true */}
          {showNavigationContent && (
            <nav className='max-md:hidden'>
              <ul className='flex items-center p-0 gap-5'>{navigationContent}</ul>
            </nav>
          )}
        </div>

        <div className='flex gap-5 items-center'>
          <a className='flex items-center gap-3 max-md:hidden' href='tel:+79302406554'>
            <span className='typography__title--medium'>{t("common.company_phone")}</span>
            <img className='header__img' src={TgIcon} alt='phone' />
          </a>

          {/* Показываем "Login / Registration" только если пользователь не авторизован */}
          {showNavigationButtonLogin ||
            (!isAuthenticated && (
              <a href={AppRoutes.AUTH_LOGIN}>
                <button className="button button--gradient">{t("login")}</button>
              </a>
            ))}

          {isAuthenticated && <button className="button button--gradient" onClick={handleLogout}>{t("logout")}</button>}

          {/* Показываем "Admin" только если пользователь авторизован и его роль - admin */}
          {isAuthenticated && user?.role === "admin" && <a href='/admin'>Admin</a>}

          <button
            type='button'
            onClick={() => dispatch(toggleSidebar())}
            aria-label='toggle view menu'
            className='hidden max-md:block'>
            <img className='header__img' src={Menu} alt='menu' />
          </button>
        </div>
      </div>
    </header>
  );
};
