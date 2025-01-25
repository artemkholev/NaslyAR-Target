import Image, { StaticImageData } from "next/image";
import { useTranslation } from "react-i18next";

import ProcessFirstElem from "@/shared/assets/images/main-page/process/first-elem.png";
import ProcessSecondElem from "@/shared/assets/images/main-page/process/second-elem.png";
import ProcessThirdElem from "@/shared/assets/images/main-page/process/third-elem.png";
import ProcessFourthElem from "@/shared/assets/images/main-page/process/fourth-elem.png";

interface Processes {
  id: number;
  bgColor: string;
  text: string;
  img: StaticImageData;
  alt: string;
}

const ProcessesListComponent = ({ processes }: { processes: Processes[] }) => {
  return processes.map((process) => (
    <div
      key={process.id}
      className='w-full flex max-md:mb-1'
      style={{
        justifyContent: process.id % 2 ? "end" : "start",
      }}>
      <div
        className='h-[320px] lg:w-full max-md:h-auto flex flex-col gap-5 rounded-[60px] p-10 max-lg:w-[500px] max-md:w-[420px] md:max-lg:relative md:max-lg:-mt-[80px]'
        style={{
          backgroundColor: process.bgColor,
        }}>
        <div className='flex justify-between'>
          <span className='w-20 h-12 bg-white rounded-full typography__title--large p-1 flex justify-center items-center'>
            {process.id + 1}
          </span>
          <Image src={process.img} alt={process.alt} />
        </div>
        <span className='typography__title--medium-plus'>{process.text}</span>
      </div>
    </div>
  ));
};

export const ProcessesList = () => {
  const { t } = useTranslation("library");

  const processes: Processes[] = [
    {
      id: 0,
      bgColor: "#E7F0F4",
      text: t("home_page.process.process_1"),
      img: ProcessFirstElem,
      alt: t("home_page.process.process_1"),
    },
    {
      id: 1,
      bgColor: "#E1F0F5",
      text: t("home_page.process.process_2"),
      img: ProcessSecondElem,
      alt: t("home_page.process.process_2"),
    },
    {
      id: 2,
      bgColor: "#C1D2F9",
      text: t("home_page.process.process_3"),
      img: ProcessThirdElem,
      alt: t("home_page.process.process_3"),
    },
    {
      id: 3,
      bgColor: "#86BFD9",
      text: t("home_page.process.process_4"),
      img: ProcessFourthElem,
      alt: t("home_page.process.process_4"),
    },
  ];

  return <ProcessesListComponent processes={processes} />;
};
