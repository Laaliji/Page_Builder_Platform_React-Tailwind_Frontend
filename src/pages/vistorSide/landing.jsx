import React from 'react';

import About from '../../components/landing/About';
import Analytics from '../../components/landing/Analytics';
import Canvas from '../../components/landing/Canvas';
import Features from '../../components/landing/Features';
import Header from '../../components/landing/Header';
import LazyShow from '../../components/landing/LazyShow';
import MainHero from '../../components/landing/MainHero';
import MainHeroImage from '../../components/landing/MainHeroImage';
import Pricing from '../../components/landing/Pricing';
import Product from '../../components/landing/Product';

export default function Landing(){
  return (
    <div className={`bg-background grid gap-y-16 overflow-hidden`}>
      <div className={`relative bg-background`}>
        <div className="max-w-7xl mx-auto">
          <div
            className={`relative z-10 pb-8 bg-background sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32`}
          >
            <Header />
            <MainHero />
          </div>
        </div>
        <MainHeroImage />
      </div>
      <Canvas />
      <LazyShow>
        <>
          <Product />
          <Canvas />
        </>
      </LazyShow>
      <LazyShow>
        <>
          <Features />
          <Canvas />
        </>
      </LazyShow>
      <LazyShow>
        <Pricing />
      </LazyShow>
      <LazyShow>
        <>
          <Canvas />
          <About />
        </>
      </LazyShow>
      <Analytics />
    </div>
  );
};
