import { StaticImageData } from "next/image";
import React from "react";

type ImageRenderProps = {
  imgItem?: StaticImageData;
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: "eager" | "lazy";
  onError?: () => void;
};

const MICROFRONTEND_URL = process.env.NEXT_PUBLIC_USER_URL || "http://localhost:3001";

const ImageRender: React.FC<ImageRenderProps> = ({
  imgItem,
  src,
  alt = "",
  width,
  height,
  className = "",
  loading = "lazy",
  onError,
}: ImageRenderProps) => {
  const [imageError, setImageError] = useState(false);

  // Проверка наличия imgItem или src
  if (!imgItem && !src) {
    console.error("ImageRender: Either imgItem or src must be provided.");
    return null;
  }

  // Формирование полного пути к изображению
  const fullSrc = src
    ? `${MICROFRONTEND_URL}${src.startsWith("/") ? src : `/${src}`}`
    : imgItem
    ? `${MICROFRONTEND_URL}${imgItem.src.startsWith("/") ? imgItem.src : `/${imgItem.src}`}`
    : "";

  // Обработка ошибки загрузки изображения
  // const handleError = () => {
  //   setImageError(true);
  //   if (onError) onError();
  // };

  // // Если изображение не загрузилось, можно отобразить fallback
  // if (imageError) {
  //   return <div className={className}>Image failed to load</div>;
  // }

  return (
    <img
      src={fullSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={loading}
      // onError={handleError}
    />
  );
};

export default ImageRender;
