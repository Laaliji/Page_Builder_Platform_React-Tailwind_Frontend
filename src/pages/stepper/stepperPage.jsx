import React from 'react';

import Header from '../../components/landing/Header';
import Canvas from '../../components/landing/Canvas';
import MainHeroStepper from '../../components/stepper/mainHeroStepper';
import MainHeroImage from '../../components/landing/MainHeroImage';


export default function stepperPage(){
  return (
    <div className={`bg-background grid gap-y-16 overflow-hidden`}>
      <div className={``}>
        <div className="max-w-7xl mx-auto">
          <div
            className={`relative z-10 pb-8 bg-background sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32`}
          >
            <Header />
            <MainHeroStepper />
          </div>
        </div>
        <MainHeroImage />
      </div>
      <Canvas />
    </div>
  );
};
