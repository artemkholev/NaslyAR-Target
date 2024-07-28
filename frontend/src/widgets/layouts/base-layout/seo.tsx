import { NextSeo } from 'next-seo';

export const Seo = () => {
  return (
    <NextSeo
      additionalLinkTags={[
        {
          rel: 'icon',
          href: '/site_icon.png',
        },
      ]}
      additionalMetaTags={[
        {
          name: 'keywords',
          content:
            'таргетолог авитолог директолог таргетированная реклама трафик менеджер долгосрочное сотрудничество',
        },
        {
          name: 'viewport',
          content: 'width=device-width,initial-scale=1',
        },
        {
          name: 'apple-mobile-web-app-capable',
          content: 'yes',
        },
      ]}
      description="Меня зовут Анна, я практикующий трафик менеджер. Моя задача, дать отличный результат для развития Вашего бизнеса. Поэтому я не запускаю рекламу ради рекламы. Моя цель -долгосрочное сотрудничество! Буду рада помочь!"
      nofollow
      noindex
      openGraph={{
        title: 'Target - Таргетолог Авитолог Директолог',
        description: 'Target - Таргетолог Авитолог Директолог',
      }}
      title="Таргетолог - Анна Орлова"
    />
  );
};