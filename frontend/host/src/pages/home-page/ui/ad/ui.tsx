import React from "react";
import MainInfoAvitoProfi from "@/shared/assets/images/main-page/main-info/ad.jpg";

export const AdBanner: React.FC = () => {
  return (
    <article id='ad'>
      <img
        src={MainInfoAvitoProfi}
        alt='авито, услуги и товары'
        className='rounded-2xl'
      />
    </article>
  );
};
