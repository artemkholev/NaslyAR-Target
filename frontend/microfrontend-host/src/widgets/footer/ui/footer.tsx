import React from "react";
import { useTranslation } from "react-i18next";

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  const { t } = useTranslation("library");

  return (
    <footer className='w-full flex justify-center'>
      <div className='w-[1200px] max-2xl:w-[1000px] max-lg:w-[90%] flex items-center justify-center gap-[150px] text-[10px] max-lg:gap-8 p-10 max-lg:p-20 max-lg:flex-col max-md:gap-10'>
        <div className='flex items-center text-nowrap'>
          © {year} «{t("common.company_name")}» — {t("footer.description")}
        </div>

        <div className='flex items-center text-center'>{t("footer.permission")}</div>

        <div className='flex items-center text-nowrap'>
          {t("footer.developed_by")} {t("common.development_company")}
        </div>
      </div>
    </footer>
  );
};
