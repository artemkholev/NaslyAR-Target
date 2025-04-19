import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <motion.footer
      className='py-6 mt-12'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}>
      <div className='max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 typography__meta text-black-700 text-sm text-center md:text-left'>
        <span className='whitespace-nowrap'>
          © {year} «{t("common.company_name")}» — {t("footer.description")}
        </span>

        <span className="text-center">{t("footer.permission")}</span>

        <span className='whitespace-nowrap'>
          {t("footer.developed_by")} {t("common.development_company")}
        </span>
      </div>
    </motion.footer>
  );
};
