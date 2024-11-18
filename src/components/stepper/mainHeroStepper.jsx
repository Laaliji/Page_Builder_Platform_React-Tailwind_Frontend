import React from 'react';

import CustomStepper from './CustomStepper';  

const MainHero = () => {
  return (
    <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
      <div className="sm:text-center lg:text-left">
        <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
        <span className="block xl:inline">
          <CustomStepper /> 
        </span>
        </div>
      </div>
    </main>
  );
};

export default MainHero;
