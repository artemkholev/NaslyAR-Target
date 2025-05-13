import React from "react";
import { AdBanner } from "./ad";
import { MainInfo } from "./main-info";
import { Goals } from "./goals";
import { Process } from "./process";
import { Ivocation } from "./ivocation";
import { Price } from "./price";
// import { Discount } from "./discount";
import { Cases } from "./cases";
import { Quations } from "./quations";
import { Connection } from "./connection";
import { Request } from "./request";

const HomePage: React.FC = () => {
  return (
    <div className='page'>
      <div className='page__container gap-20'>
        <AdBanner />
        <MainInfo />
        <Goals />
        <Process />
        <Ivocation />
        <Price />
        {/* <Discount /> */}
        <Cases />
        <Quations />
        <Connection />
        <Request />
      </div>
    </div>
  );
};

export default HomePage;
