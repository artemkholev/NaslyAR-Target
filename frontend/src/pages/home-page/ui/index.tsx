import { MainInfo } from './main-info';
import { Goals } from './goals';
import { Process } from './process';
import { Ivocation } from './ivocation';
import { Price } from './price';
import { Discount } from './discount';
import { Cases } from './cases';
import { Quations } from './quations';
import { Connection } from './connection';
// import { Request } from './request';

export const HomePage = () => {
  return (
    <div className='h-full w-full'>
      <MainInfo />
      <Goals />
      <Process />
      <Ivocation />
      <Price />
      <Discount />
      <Cases />
      <Quations />
      <Connection />
      {/* <Request /> */}
    </div>
  );
};
