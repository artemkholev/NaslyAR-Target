import React from "react";
import { useTranslation } from "react-i18next";

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <div className='footer'>
      <div className='footer__container'>
        <span className='whitespace-nowrap'>
          © {year} «{t("common.company_name")}» — {t("footer.description")}
        </span>

        <span className='text-center'>{t("footer.permission")}</span>

        <span className='whitespace-nowrap'>
          {t("footer.developed_by")} {t("common.development_company")}
        </span>
      </div>
    </div>
  );
};
